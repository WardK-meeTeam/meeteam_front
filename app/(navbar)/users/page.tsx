"use client";

import ToggleSwitchButton from "@/components/ToggleSwitchButton";
import Image from "next/image";
import ReviewBox from "./components/ReviewBox";
import ProjectBox from "./components/ProjectBox";
import Link from "next/link";
import * as simpleIcons from "simple-icons";
import type { SimpleIcon } from "simple-icons";
import { techStackOptions } from "@/mocks/techs";
import ModifyButton from "../projects/[projectId]/apply/components/ModifyButton";
import ProfileDefaultImg from "@/public/images/userImg2.png";
import { useAuth } from "@/context/AuthContext";

export default function Page() {
  const { user, isLoading, logout } = useAuth();

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (!user) {
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
  } = user;

  const newSkills = skills.map((sk) => sk.skill);
  const ICONS = simpleIcons as unknown as Record<string, SimpleIcon>;

  const skillsIcon = techStackOptions.filter((skill) =>
    newSkills.includes(skill.eng),
  );

  return (
    <div className="flex justify-center gap-x-8 mx-auto mt-10 px-6">
      {/*왼쪽 정보 */}
      <aside className="flex flex-col gap-y-12 min-w-2xs items-start justify-start">
        <div className="flex flex-col gap-y-10 items-start w-full">
          <div className="w-[194px] h-[194px] rounded-full overflow-hidden">
            <Image
              alt="사용자 프로필 이미지"
              src={profileImageUrl ?? ProfileDefaultImg}
              width={194}
              height={194}
              className="w-full h-full object-cover object-center"
              priority
            />
          </div>
          <div className="flex justify-center items-center gap-x-4">
            <div className="text-4xl font-extrabold">{name}</div>
            <ModifyButton />
          </div>
          {/* <div className="w-[148px] h-[45px] rounded-[8px] bg-[#FFF3F0]  flex justify-center items-center text-[#FF4802] font-bold">
            협업온도🔥 98°
          </div> */}
        </div>

        <div className="flex justify-start gap-x-4 w-full">
          <div className="flex flex-col gap-y-3">
            <div className="font-bold">나이</div>
            <div className="font-bold">성별</div>
            <div className="font-bold">이메일</div>
            <div className="font-bold">분야</div>
          </div>
          <div className="flex flex-col gap-y-3  text-[#474747]">
            <div className="">{age}세</div>
            <div className="">{gender === "MALE" ? "남성" : "여성"}</div>
            <div className=" flex items-center">{email}</div>
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
          <div className=" font-bold">기술 스택</div>
          <div className="flex flex-row flex-wrap gap-3 max-w-2xs">
            {skillsIcon.map((item) => {
              const icon = ICONS[item.iconName];
              if (!icon) return null;
              return (
                <div
                  className="group flex flex-col items-center"
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
            <div className=" font-bold">프로젝트 참여 여부</div>
            <ToggleSwitchButton
              onClick={() => {}}
              isSelected={isParticipating}
            />
          </div>
          <div className="flex gap-x-3 mt-5">
            <div className=" font-bold">프로젝트 참여 수</div>
            <div className=" font-bold">{projectCount}개</div>
          </div>
          {/*임시 로그아웃 */}
          <button className="text-red-400 cursor-pointer" onClick={logout}>
            로그아웃
          </button>
          {/* <div className="flex gap-x-3">
            <div className=" font-bold">리뷰 개수</div>
            <div className=" font-bold">{reviewCount}개</div>
          </div> */}
        </div>
      </aside>

      {/*메인 정보 부분 */}
      <main className="flex flex-col gap-y-12 mt-10 min-w-2xl">
        <div>
          {!introduce || introduce.trim() === "" ? (
            <>
              <span>소개글이 존재하지 않습니다.</span>
              <br />
              <Link
                href={"/setting-after-signup-introduce"}
                className="text-mtm-main-blue"
              >
                작성하러가기
              </Link>
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
