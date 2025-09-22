"use client";

import ToggleSwitchButton from "@/components/ToggleSwitchButton";
import { useState, useEffect } from "react";
import Image from "next/image";
import { UserProfile } from "@/types/userProfile";
import Link from "next/link";
import * as simpleIcons from "simple-icons";
import type { SimpleIcon } from "simple-icons";
import { techStackOptions } from "@/mocks/techs";
import ProfileDefaultImg from "@/public/images/userImg2.png";
import ReviewBox from "../components/ReviewBox";
import ProjectBox from "../components/ProjectBox";

export default function UserClientPage({ userId }: { userId: string }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const API = process.env.NEXT_PUBLIC_API_BASE_URL;
      const accessToken = localStorage.getItem("accessToken");
      try {
        if (!accessToken) {
          alert("로그인이 필요합니다!");
          return;
        }

        const response = await fetch(`${API}/api/members/${userId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
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
  }, []);

  if (loading) {
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

  console.log(profileImageUrl);

  const newSkills = skills.map((sk) => sk.skill);
  const ICONS = simpleIcons as unknown as Record<string, SimpleIcon>;

  const skillsIcon = techStackOptions.filter((skill) =>
    newSkills.includes(skill.eng),
  );

  return (
    <div className="flex justify-center gap-x-11 mx-auto mt-10">
      {/*왼쪽 정보 */}
      <aside className="flex flex-col gap-y-12 mr-5">
        <div className="flex flex-col gap-y-4 items-center">
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
            <div className="text-[36px] font-extrabold">{name}</div>
          </div>
        </div>

        <div className="flex justify-center items-between gap-x-9 mt-10">
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

        <div className="flex flex-col gap-y-3">
          <div className=" font-bold">기술 스택</div>
          <div className="flex flex-row flex-wrap gap-3 max-w-[500px]">
            {skillsIcon.map((item) => {
              const icon = ICONS[item.iconName];
              if (!icon) return null;
              return (
                <svg
                  key={`project-${email}-${item.iconName}`}
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  viewBox="0 0 24 24"
                  width="40"
                  height="40"
                  fill={`#${icon.hex}`}
                >
                  <path d={icon.path} />
                </svg>
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
        </div>
      </aside>

      {/*메인 정보 부분 */}
      <main className="flex flex-col gap-y-12 mt-10 ml-10 pl-10">
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
