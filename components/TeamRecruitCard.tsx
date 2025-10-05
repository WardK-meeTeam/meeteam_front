"use client";

import * as simpleIcons from "simple-icons";
import { techStackOptions } from "@/mocks/techs";
import Image from "next/image";
import type { SimpleIcon } from "simple-icons";

interface Skill {
  skillName: string;
  percent: number;
}
interface TeamCardProps {
  profileImg: string;
  name: string;
  temp: number;
  sideProjectCount: number;
  skills: Skill[];
}

type TeamRecruitCardProps = React.ComponentPropsWithoutRef<"div"> & TeamCardProps;

export default function TeamRecruitCard({
  profileImg,
  name,
  temp,
  sideProjectCount,
  skills,
  className,
  ...rest
}: TeamRecruitCardProps) {

  const ICONS= simpleIcons as unknown as Record<string, SimpleIcon>;
  
  return (
    <div className={`w-[305px] h-[200px] bg-[#F5F7F9] rounded-[16px] flex-none ${className ?? ""}`}
    {...rest}>
      {/* 위칸 */}
      <div className="h-[67%] flex justify-start items-center p-5 gap-x-6">
        <div className="flex flex-col justify-center items-center gap-y-2">
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
          <div className="flex items-center gap-x-2">
            <div className="text-[14px] font-bold">협업온도</div>
            <div>{temp}°</div>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="text-[14px] font-bold">사이드 프로젝트</div>
            <div>{sideProjectCount}회</div>
          </div>
        </div>
      </div>

      {/* 아래칸 */}
      <div className="flex items-center px-5 py-3 ml-4 gap-x-10">
        <div className="text-[14px] font-bold text-[#C48DFF]">Skill</div>
        <div className="flex items-center gap-x-2">
            <div className="flex items-center gap-x-2">
              {skills.slice(0,3).map((skill, idx) => {
                const raw = (skill.skillName || "").trim();
                const iconName = techStackOptions.find(option => option.eng === raw || option.kor === raw)?.iconName;
                const icon = ICONS[iconName || ""];

                if (!icon) {
                  return (
                    <span key={`${name}-${raw}-${idx}`} className="text-[12px] px-2 py-1 bg-white rounded-full text-[#666]">
                      {raw}
                    </span>
                  );
                }

                return (
                  <div 
                    key={`${name}-${raw}-${idx}`}
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
              })}
            </div>
            {skills.length - 3 > 0 && (
              <div className="text-[12px] font-bold text-[#CFCFCF]">+{skills.length - 3}</div>
            )}
        </div>
      </div>
    </div>
  );
}
