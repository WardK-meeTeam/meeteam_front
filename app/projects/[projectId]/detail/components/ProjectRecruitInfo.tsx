import { techStackOptions } from "@/mocks/techs";
import RecruitCurrentRow from "./RecruitCurrentRow";
import * as simpleIcons from "simple-icons";
import { ProjectRecruitInfoItem } from "@/types/projectInfo";
import type { SimpleIcon } from "simple-icons";

interface ProjectRecruitInfoProps extends ProjectRecruitInfoItem {
  projectId: string;
}

export default function ProjectRecruitInfo({
  projectId,
  offlineRequired,
  endDate,
  skills,
  recruitments,
}: ProjectRecruitInfoProps) {
  const [year, month, date] = endDate.split("-");
  const ICONS = simpleIcons as unknown as Record<string, SimpleIcon>;

  const skillsIcon = techStackOptions.filter((skill) =>
    skills.includes(skill.eng),
  );
  const recuitingBigCategory = recruitments.map((item) => item.bigCategory);
  // 중복 제거
  const uniqueRecuitingBigCategory = Array.from(new Set(recuitingBigCategory));

  return (
    <div className="flex flex-col gap-10">
      <span className="text-[26px] font-bold">프로젝트 모집 정보</span>
      <section className="flex flex-row gap-15 items-baseline">
        <span className="font-bold">모집 분야</span>
        <div>
          {uniqueRecuitingBigCategory.map((item, idx) => (
            <span key={`detail-${projectId}-${item}`}>
              {item}
              {idx !== uniqueRecuitingBigCategory.length - 1 ? "," : ""}
            </span>
          ))}
        </div>
      </section>
      <section className="flex flex-row gap-15 items-baseline">
        <span className="font-bold">모집 현황</span>
        <div className="flex flex-col gap-5">
          {recruitments.map((item) => (
            <RecruitCurrentRow
              key={`project-${projectId}-recruit-status-${item.subCategory}-${item.currentCount}/${item.recruitmentCount}`}
              {...item}
              projectId={projectId}
            />
          ))}
        </div>
      </section>
      <div className="flex flex-col gap-6">
        <span className="font-bold">기술 스택</span>
        <div className="flex flex-row flex-wrap gap-3 max-w-[500px]">
          {skillsIcon.map((item) => {
            const icon = ICONS[item.iconName];
            if (!icon) return null;
            return (
              <div
                className="group flex flex-col items-center"
                key={`project-${projectId}-${item.iconName}`}
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
                      text-[6px] mt-1"
                >
                  {icon.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex gap-8">
        <span className="w-56 font-bold">오프라인 정기 모임 필수 여부</span>
        <span>{offlineRequired === true ? "필수" : "선택"}</span>
      </div>
      <div className="flex gap-8">
        <span className="w-56 font-bold">프로젝트 마감 기한</span>
        <span>{`${year}년 ${month}월 ${date}일`}</span>
      </div>
    </div>
  );
}
