"use client";

import * as simpleIcons from "simple-icons";
import { techStackOptions } from "@/mocks/techs";
import Image from "next/image";
import type { SimpleIcon } from "simple-icons";

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
    <div className={`w-[305px] bg-[#F5F7F9] rounded-[16px] flex-none ${className ?? ""} pt-6 pb-8 px-6`}
    {...rest}>
      {/* 위칸 */}
      <div className="flex gap-x-6 justify-start items-center mb-5">
        <div className="flex flex-col gap-y-2 justify-center items-center">
          <div className="w-[63px] h-[63px] rounded-[50%] bg-cover bg-center" style={{ backgroundImage: `url(${profileImg})` }} />
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
      <div className="flex items-center">
        <span className="flex items-center font-bold text-[#C48DFF] text-center min-w-[87px] box-sizing-border pr-6 min-h-10">Skills</span>
        {
          skills.slice(0, 3).map((skill, idx) => {
          const iconName = techStackOptions.find(option => option.eng === skill)?.iconName;
          const icon = ICONS[iconName || ""];
          if (!icon) return null;
            return (
              <div 
                key={`${userId}-${skill}-${idx}`}
                className="flex justify-center items-center p-1 mr-1 w-10 h-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  viewBox="0 0 24 24"
                  width="30"
                  height="30"
                  fill={`#${icon.hex}`}
                >
                  <path d={icon.path} />
                </svg>
              </div>
            );
          })
          }
          <div className="flex justify-center text-xs font-bold items text-mtm-text-gray">
            { skills.length > 3 ? `+ ${skills.length - 3}` : null }
          </div>
      </div>
    </div>
  );
}
