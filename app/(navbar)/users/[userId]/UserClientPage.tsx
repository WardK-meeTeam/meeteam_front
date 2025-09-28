"use client";

import ToggleSwitchButton from "@/components/ToggleSwitchButton";
import { useState, useEffect } from "react";
import Image from "next/image";
import { UserProfile } from "@/types/userProfile";
// import Link from "next/link";
import * as simpleIcons from "simple-icons";
import type { SimpleIcon } from "simple-icons";
import { techStackOptions } from "@/mocks/techs";
import ProfileDefaultImg from "@/public/images/userImg2.png";
import ReviewBox from "../components/ReviewBox";
import ProjectBox from "../components/ProjectBox";
import { authFetch } from "@/api/authFetch";
import { useAuth } from "@/context/AuthContext";
import ModifyButton from "../../projects/[projectId]/apply/components/ModifyButton";

export default function UserClientPage({ userId }: { userId: string }) {
  const { user, isLoading, logout } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const isMyPage = userId.toString() === user?.memberId.toString();

  useEffect(() => {
    if (!isMyPage) {
      const getData = async () => {
        setLoading(true);
        try {
          const response = await authFetch(`/api/members/${userId}`);

          if (response.ok) {
            const data = await response.json();
            setProfile(data.result);
          } else {
            const errorData = await response.json();
            alert(errorData.message);
          }
        } catch (error) {
          alert(`알 수 없는 오류가 발생했습니다 (${error})`);
        } finally {
          setLoading(false);
        }
      };

      getData();
    } else {
      setLoading(false);
      setProfile(user);
    }
  }, [userId]);

  if (loading || isLoading) {
    return <div>로딩중...</div>;
  }

  if (!profile) {
    return <div>조회된 정보가 없습니다.</div>;
  }

  const {
    name,
    age,
    gender,
    email,
    categories,
    skills,
    isParticipating,
    projectCount,
    // reviewCount,
    introduce,
    // reviewList,
    projectList,
    profileImageUrl,
  } = profile;

  const newSkills = skills.map((sk) => sk.skill);
  const ICONS = simpleIcons as unknown as Record<string, SimpleIcon>;

  const skillsIcon = techStackOptions.filter((skill) =>
    newSkills.includes(skill.eng),
  );

  return (
    <div className="flex gap-x-8 justify-center px-6 mx-auto mt-10">
      {/*왼쪽 정보 */}
      <aside className="flex flex-col gap-y-12 justify-start items-start min-w-2xs">
        <div className="flex flex-col gap-y-10 items-start w-full">
          <div className="w-[194px] h-[194px] rounded-full overflow-hidden">
            <Image
              alt="사용자 프로필 이미지"
              src={profileImageUrl ?? ProfileDefaultImg}
              width={194}
              height={194}
              className="object-cover object-center w-full h-full"
              priority
            />
          </div>

          <div className="flex justify-center items-center gap-x-4">
            <div className="text-4xl font-extrabold">{name}</div>
            {isMyPage && <ModifyButton />}
          </div>

          {/* <div className="w-[148px] h-[45px] rounded-[8px] bg-[#FFF3F0]  flex justify-center items-center text-[#FF4802] font-bold">
            협업온도🔥 98°
          </div> */}
        </div>

        <div className="flex gap-x-4 justify-start w-full">
          <div className="flex flex-col gap-y-3">
            <div className="font-bold">나이</div>
            <div className="font-bold">성별</div>
            <div className="font-bold">이메일</div>
            <div className="font-bold">분야</div>
          </div>
          <div className="flex flex-col gap-y-3  text-[#474747]">
            <div className="">{age}세</div>
            <div className="">{gender === "MALE" ? "남성" : "여성"}</div>
            <div className="flex items-center">{email}</div>
            <div className="flex flex-col">
              {categories.map((category, idx) => (
                <div key={idx} className="flex gap-x-2">
                  <span className="after:content-[','] last:after:content-['']">
                    {category.bigCategory}
                  </span>
                  <span className="after:content-[','] last:after:content-['']">
                    {category.smallCategory}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-y-3 w-full">
          <div className="font-bold">기술 스택</div>
          <div className="flex flex-row flex-wrap gap-3 max-w-2xs">
            {skillsIcon.map((item) => {
              const icon = ICONS[item.iconName];
              if (!icon) return null;
              return (
                <div
                  className="flex flex-col items-center group"
                  key={`project-${email}-${item.iconName}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    viewBox="0 0 24 24"
                    width="40"
                    height="40"
                    fill={`#${icon.hex}`}
                    className="transition-transform duration-200 ease-in-out hover:scale-106"
                  >
                    <path d={icon.path} />
                  </svg>

                  <div
                    className="opacity-0 group-hover:opacity-100
                            transition-opacity duration-200 ease-in-out
                          text-[10px] mt-1"
                  >
                    {item.eng}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex gap-x-3 mt-7">
            <div className="font-bold">프로젝트 참여 여부</div>
            <ToggleSwitchButton
              onClick={() => {}}
              isSelected={isParticipating}
            />
          </div>
          <div className="flex gap-x-3 mt-5">
            <div className="font-bold">프로젝트 참여 수</div>
            <div className="font-bold">{projectCount}개</div>
          </div>
          {/* <div className="flex gap-x-3">
            <div className="font-bold">리뷰 개수</div>
            <div className="font-bold">{reviewCount}개</div>
          </div> */}

          {isMyPage && (
            <button
              className="text-red-400 cursor-pointer text-left"
              onClick={logout}
            >
              로그아웃
            </button>
          )}
        </div>
      </aside>

      {/*메인 정보 부분 */}
      <main className="flex flex-col gap-y-12 mt-10 min-w-2xl">
        <div>
          {!introduce || introduce.trim() === "" ? (
            <>
              <span>소개글이 존재하지 않습니다.</span>
              <br />
            </>
          ) : (
            introduce
          )}
        </div>

        <ReviewBox reviews={[]} />
        <ProjectBox projects={projectList} />
      </main>
    </div>
  );
}
