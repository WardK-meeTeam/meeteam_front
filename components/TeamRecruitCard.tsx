"use client";

import Image from "next/image";
import simpleIcons from "simple-icons/icons.json";
import type { SimpleIcon } from "simple-icons";
import { techStackOptions } from "@/mocks/techs";

interface Skill {
  skillName: string;
  percent: number;
}
interface TeamCardProps {
  userId: number;
  profileImg: string;
  name: string;
  temp: number;
  sideProjectCount: number;
  skills: string[];
}

type TeamRecruitCardProps = React.ComponentPropsWithoutRef<"div"> & TeamCardProps;

export default function TeamRecruitCard({
  userId,
  profileImg,
  name,
  temp,
  sideProjectCount,
  skills,
  className,
  ...rest
}: TeamRecruitCardProps) {
  const ICONS = simpleIcons as unknown as Record<string, SimpleIcon>;

  return (
    <div className={`w-[305px] h-[239px] bg-[#F5F7F9] rounded-[16px] flex-none ${className ?? ""}`}
    {...rest}>
      {/* 위칸 */}
      <div className="flex gap-x-6 justify-start items-center p-5">
        <div className="flex flex-col gap-y-2 justify-center items-center">
          <Image
            className="rounded-[50%]"
            src={`${profileImg}`}
            alt="profileImage"
            width={63}
            height={63}
          />
          <div className="text-[12px] font-bold">{name}</div>
        </div>
        <div className="flex flex-col justify-center items-start">
          <div className="flex gap-x-2 items-center">
            <div className="text-[14px] font-bold">협업온도</div>
            <div>{temp}°</div>
          </div>
          <div className="flex gap-x-2 items-center">
            <div className="text-[14px] font-bold">사이드 프로젝트</div>
            <div>{sideProjectCount}회</div>
          </div>
        </div>
      </div>

      {/* 아래칸 */}
      <div className="flex px-5">
        <span className="font-bold text-[#C48DFF] min-w-[87px]">Skills</span>
        {
          skills.slice(0, 3).map((skill, idx) => {
          const iconName = techStackOptions.find(option => option.eng === skill)?.iconName;
          const icon = ICONS[iconName || ""];
          if (!icon) return null;
            return (
              <div 
                key={`${userId}-${skill}-${idx}`}
                className="p-1 bg-white rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill={`#${icon.hex}`}
                >
                  <path d={icon.path} />
                </svg>
              </div>
            );
          })
          }
      </div>
    </div>
  );
}
