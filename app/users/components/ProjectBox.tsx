"use client";

import { Project } from "@/types/userProfile";
import BgDefault from "@/public/images/HealthCare.png";
import { useRouter } from "next/navigation";

type ProjectBoxProps = {
  projects: Project[];
};

const ProjectBox = ({ projects }: ProjectBoxProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-y-5 my-12">
      <div className="flex items-center gap-x-5">
        <div className="text-[20px] font-extrabold flex justify-center items-center">
          Project
        </div>
        <div className="flex justify-center items-center">
          {projects.length}개
        </div>
      </div>
      <div className="w-[753px] h-[2px] bg-black mb-5"></div>
      <div className="h-[386px] overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-black scrollbar-track-[#EDEDED]">
        <div className="grid grid-cols-3 gap-x-3 gap-y-5">
          {projects.map((project, key) => {
            const [year, month, day] = project.localDate.split("-");
            const bgImg = project.imageUrl ?? BgDefault.src;
            return (
              <div
                key={key}
                className="aspect-[4/3] w-[244px] rounded-[8px] bg-cover bg-center flex flex-col justify-between cursor-pointer"
                onClick={() =>
                  router.push(
                    `/projects/${!project.projectId ? -1 : project.projectId}/detail`,
                  )
                }
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 2%, rgba(0, 0, 0, 0.4) 83%), url(${bgImg}) `,
                }}
              >
                <div className="flex flex-col items-end justify p-4">
                  <div className="w-[58px] h-[18px] rounded-[10px] flex justify-center items-center bg-mtm-light-purple">
                    <div className="text-[8px] font-semibold text-mtm-purple">
                      {project.status}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-end p-3">
                  <div className="flex text-white gap-x-2">
                    <div className="text-[10px] font-semibold">
                      프로젝트 완료일
                    </div>
                    <div className="text-[10px]">
                      {year}년 {month}월 {day}일
                    </div>
                  </div>
                  <div className="text-[16px] font-extrabold text-white w-[164px]">
                    {project.title}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectBox;
