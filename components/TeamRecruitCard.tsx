"use client";

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

export default function TeamRecruitCard({
  profileImg,
  name,
  temp,
  sideProjectCount,
  skills,
}: TeamCardProps) {
  return (
    <div className="w-[305px] h-[239px] bg-[#F5F7F9] rounded-[16px]">
      {/* 위칸 */}
      <div className="flex justify-left items-center p-5 gap-x-6">
        <div className="flex flex-col justify-center items-center gap-y-2">
          <img
            className="w-[63px] h-[63px] rounded-[50%]"
            src={`${profileImg}`}
            alt="profileImage"
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
      <div className="flex flex-col px-5">
        <div className="text-[14px] font-bold text-[#C48DFF]">Skill</div>
        <div className="flex gap-x-3">
          <div className="flex flex-col justify-center items-start">
            {skills.map((skill, idx) => (
              <div key={idx} className="text-[14px]">
                {skill.skillName}
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-center items-left gap-y-5">
            {skills.map((skill, idx) => (
              <div
                key={idx}
                className="w-[108px] h-[5px] rounded-[30px] bg-white"
              >
                <div
                  className="h-full rounded-[30px] bg-[#C48DFF]"
                  style={{ width: `${skill.percent}%` }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
