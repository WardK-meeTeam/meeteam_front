"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import Bell from "@/public/images/Bell.svg";
import { NotificationToast } from "./NotificationToast";
import { EventSourcePolyfill } from "event-source-polyfill";
import { connectSSE } from "@/utils/connectSSE";
import {
  ProjectApplyDecision,
  ProjectApplyNotification,
  ProjectMyApplyNotification,
} from "@/types/notification";

type SSENotification =
  | ProjectApplyNotification
  | ProjectMyApplyNotification
  | ProjectApplyDecision;

export default function Navbar() {
  const isLoggedIn = true;
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [name, setName] = useState<string | null>(null);

  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<SSENotification[]>([]);

  const handleNotificationClick = () => {
    setShowNotification((prev) => !prev);
  };

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  useEffect(() => {
    const savedUser = localStorage.getItem("user-storage");
    if (!savedUser) return;
    setName(JSON.parse(savedUser).state.user.name);
  }, []);

  useEffect(() => {
    const API = process.env.NEXT_PUBLIC_API_BASE_URL;
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.log("로그인 필요함");
      return; // 토큰이 없으면 즉시 effect 종료
    }

    // Effect가 여전히 유효한지 추적하기 위한 플래그
    let isMounted = true;
    let eventSource: EventSourcePolyfill | undefined;

    const setupSSE = async () => {
      try {
        const es = await connectSSE(
          `${API}/api/subscribe`,
          accessToken,
          setNotifications,
        );

        // 비동기 작업이 완료된 후에도 컴포넌트가 마운트 상태인지 확인
        if (isMounted) {
          eventSource = es;
        } else {
          // 만약 그 사이에 컴포넌트가 사라졌다면, 생성된 연결을 즉시 닫음
          es.close();
        }
      } catch (error) {
        console.error("SSE 연결 설정 중 오류 발생:", error);
      }
    };

    setupSSE();

    // 클린업 함수
    return () => {
      // 클린업 시 플래그를 false로 설정
      isMounted = false;
      // eventSource가 할당되었다면 연결 종료
      eventSource?.close();
      console.log("SSE 연결이 정리되었습니다.");
    };
  }, []); // 마운트 시 한 번만 실행

  return (
    <header className="flex gap-8 justify-between items-baseline w-full pt-9 pb-9 pl-8 pr-8">
      <div className="flex gap-7 items-baseline">
        <Link className="text-2xl font-bold cursor-pointer" href={"/"}>
          meeTeam
        </Link>
        <h2
          className="font-semibold cursor-pointer"
          onClick={() => alert("포폴 이동")}
        >
          포트폴리오
        </h2>
        <h2
          className="font-semibold cursor-pointer"
          onClick={() => alert("플젝 이동")}
        >
          프로젝트
        </h2>
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
            className="w-full bg-transparent pl-3 outline-none"
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
          {isLoggedIn ? (
            <li className="text-mtm-text-gray pl-2 min-w-50" onClick={() => {}}>
              <Link href={"/users"} className="font-bold">
                {name ?? ""}님!
              </Link>
              안녕하세요
            </li>
          ) : (
            <Fragment>
              <li
                className="text-mtm-text-gray cursor-pointer px-2"
                onClick={() => router.push("/signup")}
              >
                회원가입
              </li>
              <li
                className="text-mtm-text-gray cursor-pointer px-2"
                onClick={() => router.push("/signin")}
              >
                로그인
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
              <span className="absolute -top-2 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
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
