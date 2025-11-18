"use client";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import Bell from "@/public/images/Bell.svg";
import { NotificationToast } from "../../../components/NotificationToast";
import { EventSourcePolyfill } from "event-source-polyfill";
import { connectSSE } from "@/utils/connectSSE";
import {
  ProjectApplyDecision,
  ProjectApplyNotification,
  ProjectMyApplyNotification,
} from "@/types/notification";
import { useAuth } from "@/context/AuthContext";
import Cookies from "js-cookie";
import { NAVIGATION_LISTS } from "@/constants/navigationBarConstants";

type SSENotification =
  | ProjectApplyNotification
  | ProjectMyApplyNotification
  | ProjectApplyDecision;

export default function Navbar() {
  const { user, isLoading } = useAuth();

  const [search, setSearch] = useState("");
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<SSENotification[]>([]);

  const handleNotificationClick = () => {
    setShowNotification((prev) => !prev);
  };

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  // 이부분은 SSE 구현부
  useEffect(() => {
    if (!user) {
      return;
    }

    const API = process.env.NEXT_PUBLIC_API_BASE_URL;
    const accessToken = Cookies.get("accessToken");

    if (!accessToken) {
      console.log("로그인 필요함");
      return;
    }

    let isMounted = true;
    let eventSource: EventSourcePolyfill | undefined;

    const setupSSE = async () => {
      try {
        const es = await connectSSE(
          `${API}/api/subscribe`,
          accessToken,
          setNotifications,
        );

        if (isMounted) {
          eventSource = es;
        } else {
          es.close();
        }
      } catch (error) {
        console.error("SSE 연결 설정 중 오류 발생:", error);
      }
    };

    setupSSE();

    return () => {
      isMounted = false;
      eventSource?.close();
      console.log("SSE 연결이 정리되었습니다.");
    };
  }, [user]); // 마운트 시 한 번만 실행

  return (
    <header className="flex gap-8 justify-between items-baseline pt-9 pr-8 pb-9 pl-8 w-full">
      <div className="flex gap-7 items-baseline">
        <Link className="text-2xl font-bold cursor-pointer" href={"/"}>
          meeTeam
        </Link>
        {Object.entries(NAVIGATION_LISTS).map(([displayName, address]) => (
          <Link href={address} className='font-semibold cursor-pointer"'>
            {displayName}
          </Link>
        ))}
      </div>
      <div className="flex gap-5 items-center">
        <form
          className="flex justify-between items-center w-[390px] h-[36px] p-2 bg-[#F8F8F8] border border-[#E8E8E8] rounded-2xl"
          onSubmit={(e) => {
            e.preventDefault();
            alert("검색어 : " + search);
          }}
        >
          <input
            className="pl-3 w-full bg-transparent outline-none"
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="검색어를 입력해주세요"
          />
          <button type="submit">
            <Image
              className="m-3 cursor-pointer"
              src="/images/search_icon.svg"
              alt="검색 아이콘"
              width={24}
              height={24}
            />
          </button>
        </form>
        <ul className="flex divide-x-1 divide-mtm-text-gray">
          {isLoading ? (
            "로딩중"
          ) : user?.name ? (
            <li className="pl-2 text-mtm-text-gray min-w-50">
              <Link href={`/users/${user.memberId}`} className="font-bold">
                {user?.name ?? ""}님!
              </Link>{" "}
              안녕하세요
            </li>
          ) : (
            <Fragment>
              <li className="px-2 cursor-pointer text-mtm-text-gray">
                <Link href={"/signin"}>로그인</Link>
              </li>
            </Fragment>
          )}
        </ul>

        <div className="relative">
          <Image
            src={Bell}
            width={20}
            height={20}
            alt="알림"
            onClick={handleNotificationClick}
            className="cursor-pointer"
          />

          {notifications.length !== 0 && (
            <>
              <span className="absolute -right-1 -top-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </>
          )}
          <NotificationToast
            show={showNotification}
            onClose={() => setShowNotification(false)}
            notifications={notifications}
          />
        </div>
      </div>
    </header>
  );
}
