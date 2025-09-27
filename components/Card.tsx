"use client";

import Image from "next/image";

export interface CardProps {
  category: string;
  tool: string;
  teamName: string;
  date: string;
  tools: string[];
  title: string;
  leader: string;
  progress: number;
  teamSize: number;
  userImg: string[];
  deadDate: string;
  passionLevel: number;
}

const CardBgImgs: { [key: string]: string } = {
  // 기존 키 (더미 데이터용)
  Beauty: "/images/Beauty.png",
  Eco: "/images/Eco.png",
  Education: "/images/Education.png",
  Pet: "/images/Pet.png",
  Productivity: "/images/Productivity.png",
  Healthcare: "/images/HealthCare.png",
  
  // API 카테고리 키 추가
  FASHION_BEAUTY: "/images/Beauty.png",
  ENVIRONMENT: "/images/Eco.png",
  EDUCATION: "/images/Education.png",
  PET: "/images/Pet.png",
  FINANCE_PRODUCTIVITY: "/images/Productivity.png",
  HEALTHCARE: "/images/HealthCare.png",
  AI_TECH: "/images/Ai.png",
  ETC: "/images/Productivity.png", // 기타는 생산성 이미지 사용
};

const ToolImgs: { [key: string]: string } = {
  Ai: "/images/Ai.png",
  Figma: "/images/Figma.png",
  Ps: "/images/Ps.png",
};

// 순서대로 [textColor, boxColor, (gradient colors 3개)]
const CategoryColors: { [key: string]: [string, string, string, string] } = {
  // 기존 키 (더미 데이터용)
  Beauty: ["#DB6893", "#FFF0F9", "#F3D8E6", "#F2CAD2"],
  Eco: ["#71B04E", "#E5FFD6", "#AAEBE0", "#CBE8BA"],
  Education: ["#A27DC2", "#F5E9FF", "#C7C9EE", "#DDCCEA"],
  Pet: ["#F1A800", "#FFFCE9", "#F4D2BD", "#F4EDBF"],
  Productivity: ["#3A84BC", "#D9FBFF", "#CCDEFF", "#B5E7ED"],
  Healthcare: ["#EE7366", "#FFEAE8", "#FFCAC1", "#F7E2DC"],
  
  // API 카테고리 키 추가
  FASHION_BEAUTY: ["#DB6893", "#FFF0F9", "#F3D8E6", "#F2CAD2"],
  ENVIRONMENT: ["#71B04E", "#E5FFD6", "#AAEBE0", "#CBE8BA"],
  EDUCATION: ["#A27DC2", "#F5E9FF", "#C7C9EE", "#DDCCEA"],
  PET: ["#F1A800", "#FFFCE9", "#F4D2BD", "#F4EDBF"],
  FINANCE_PRODUCTIVITY: ["#3A84BC", "#D9FBFF", "#CCDEFF", "#B5E7ED"],
  HEALTHCARE: ["#EE7366", "#FFEAE8", "#FFCAC1", "#F7E2DC"],
  AI_TECH: ["#3A84BC", "#D9FBFF", "#CCDEFF", "#B5E7ED"], // AI는 생산성 색상 사용
  ETC: ["#A5A5A5", "#F5F5F5", "#E0E0E0", "#D0D0D0"], // 기타는 회색 계열
};

export default function Card({
  category,
  teamName,
  date,
  title,
  leader,
  progress,
  teamSize,
  userImg,
  deadDate,
  passionLevel,
}: CardProps) {
  return (
    <div className="m-3 w-[305px] h-[415px] [perspective: 1000px] group cursor-pointer">
      {/*카드 전체 회전용 wrapper*/}
      <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/*카드 앞면*/}
        <div className="absolute w-full h-full [backface-visibility:hidden]">
          <div
            className="w-full h-[415px] full rounded-[16px] flex flex-col justify-between overflow-hidden bg-cover bg-center relative"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 2%, rgba(0, 0, 0, 0.8) 83%), url(${CardBgImgs[category] || "/images/HealthCare.png"})`,
            }}
          >
            {/*위쪽*/}
            <div>
              <div className="flex justify-between items-center mx-6 mt-6">
                <div
                  className="h-[25px]  border-none rounded-[16px] text-[14px] font-semibold text-[#EE7366] flex justify-center items-center px-3"
                  style={{
                    color: `${CategoryColors[category]?.[0] || "#EE7366"}`,
                    backgroundColor: `${CategoryColors[category]?.[1] || "#FFEAE8"}`,
                  }}
                >
                  {category || "ETC"}
                </div>
                <div className="text-[14px] font-normal text-white">{date}</div>
              </div>

              <div className="flex gap-x-2 justify-start items-center px-6 mt-4">
                <div className="flex gap-x-1">
                  {[1, 2, 3].map((tool, idx) => (
                    <Image
                      key={idx}
                      className="rounded-[4px]"
                      src={ToolImgs[tool] || "/images/Figma.png"}
                      alt="tool"
                      width={23}
                      height={23}
                    />
                  ))}
                </div>
                <div className="text-[12px] font-bold flex justify-center items text-white">
                  +2
                </div>
              </div>
            </div>

            {/*아래쪽*/}
            <div className="flex flex-col justify-center items-center m-5">
              <div className="w-[212px] text-[20px] font-bold text-white text-center leading-tight break-words">
                {title || "스마트 호흡 트레커를 통한 천식 모니터링 앱"}
              </div>
              <div className="flex items-center justify-between gap-x-2 text-[12px] m-4 text-white">
                <div className="font-semibold">팀장</div>
                <div className="font-normal">{leader || "김도윤"}</div>
              </div>
              <div>
                <div className="flex gap-x-1 justify-end items-center mb-2 text-white">
                  <div className="text-[14px] font-medium ">
                    {progress || 70}%
                  </div>
                  <div className="text-[12px] font-normal">진행</div>
                </div>
                <div className="w-[230px] h-[5px] border border-none rounded-[30px] bg-[#E0E0E0] mb-1.5">
                  <div
                    className="h-full rounded-[30px]"
                    style={{
                      width: `${progress || 70}%`,
                      backgroundColor: `${CategoryColors[category]?.[0] || "#EE7366"}`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*카드 뒷면*/}
        <div className="absolute w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div
            className="w-full h-[415px] rounded-[16px] flex flex-col items-center relative"
            style={{
              backgroundImage: `linear-gradient(143deg,
                          ${CategoryColors[category][2]} 0%,
                          ${CategoryColors[category][2]} 30%,
                          #FFFFFF 49.75%,
                          #FFFFFF 50.25%,
                          ${CategoryColors[category][3]} 70%,
                          ${CategoryColors[category][3]} 100%)`,
            }}
          >
            <div
              className="h-[25px] text-[14px] font-semibold border border-none rounded-[13px] flex items-center justify-center m-6 px-3"
              style={{
                color: `${CategoryColors[category]?.[0] || "#EE7366"}`,
                backgroundColor: `${CategoryColors[category]?.[1] || "#FFEAE8"}`,
              }}
            >
              {teamName}
            </div>

            <div className="flex gap-x-2 mt-5">
              <div className="text-[16px] font-medium text-[#757575]">팀원</div>
              <div
                className="text-[16px] font-semibold"
                style={{
                  color: `${CategoryColors[category]?.[0] || "#EE7366"}`,
                }}
              >
                {teamSize || 0}명
              </div>
            </div>

            <div className="flex flex-col gap-y-2 my-3">
              <div className="flex gap-x-2 justify-center items-center">
                {userImg.slice(0, 4).map((img, idx) => (
                  <Image
                    key={idx}
                    className="object-cover rounded-full"
                    src={img}
                    alt={`user-${idx}`}
                    width={56}
                    height={56}
                  />
                ))}
              </div>
              <div className="flex gap-x-2 justify-center items-center">
                {userImg.slice(4, 7).map((img, idx) => (
                  <Image
                    key={idx}
                    className="object-cover rounded-full"
                    src={img}
                    alt={`user-${idx}`}
                    width={56}
                    height={56}
                  />
                ))}
              </div>
              <div
                className="absolute text-[12px] font-medium"
                style={{
                  top: "214px",
                  left: "252px",
                  color: `${CategoryColors[category][0]}`,
                }}
              >
                +{teamSize - userImg.length}
              </div>
            </div>

            <div className="w-[243px] border border-[#D9D9D9] my-5"></div>

            <div className="flex gap-x-2 mt-3">
              <div className="text-[16px] font-bold text-[#757575]">
                목표 기간
              </div>
              <div className="text-[16px] font-medium text-[#757575]">
                {deadDate}
              </div>
            </div>
            <div className="flex gap-x-2 my-2">
              <div className="text-[16px] font-bold text-[#757575]">
                열정 레벨
              </div>
              <div className="text-[16px] font-medium text-[#757575]">
                LV. {passionLevel}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
