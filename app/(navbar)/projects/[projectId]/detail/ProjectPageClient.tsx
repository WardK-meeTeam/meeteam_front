"use client";

import { useEffect, useState, useCallback } from "react";
import MemberList from "./components/MemberList";
import ProjectInfo from "./components/ProjectInfo";
import ProjectRecruitInfo from "./components/ProjectRecruitInfo";
import {
  Member,
  ProjectInfoItem,
  ProjectRecruitInfoItem,
} from "@/types/projectInfo";
import { useRouter } from "next/navigation";
import { authFetch } from "@/api/authFetch";

export default function ProjectPageClient({
  projectId,
}: {
  projectId: string;
}) {
  const [projectMembers, setProjectMembers] = useState<Member[]>([]);
  const [projectInfo, setProjectInfo] = useState<ProjectInfoItem>({
    name: "",
    description: "",
    likeCount: 0,
    platformCategory: "",
    projectCategory: "",
    imageUrl: null,
    startDate: "",
  });
  const [projectRecruit, setProjectRecruit] = useState<ProjectRecruitInfoItem>({
    offlineRequired: false,
    endDate: "",
    skills: [],
    recruitments: [],
  });
  const router = useRouter();

  const API = process.env.NEXT_PUBLIC_API_BASE_URL;

  const fetchProjectDetail = useCallback(async () => {
    const response = await authFetch(`/api/projects/V2/${projectId}`);

    if (response.ok) {
      const data = await response.json();

      const receivedProjectInfo = {
        name: data.result.name,
        description: data.result.description,
        likeCount: data.result.likeCount,
        platformCategory: data.result.platformCategory,
        projectCategory: data.result.projectCategory,
        imageUrl: data.result.imageUrl,
        startDate: data.result.startDate,
      };

      const receivedProjectRecruitInfo = {
        offlineRequired: data.result.offlineRequired,
        endDate: data.result.endDate,
        skills: data.result.skills,
        recruitments: data.result.recruitments,
      };

      setProjectMembers(data.result.projectMembers);
      setProjectInfo(receivedProjectInfo);
      setProjectRecruit(receivedProjectRecruitInfo);
    } else {
      const errorData = await response.json();
      alert(errorData.message);
    }
  }, [API, projectId]);

  useEffect(() => {
    fetchProjectDetail();
  }, [fetchProjectDetail]);

  return (
    <div className="flex flex-row gap-16 max-w-7xl mx-auto pb-24">
      <aside className="w-[194px] flex-1">
        <div className="sticky top-20 z-10 flex flex-col gap-3">
          <span className="text-[14px]">프로젝트를 함께할 사람들</span>
          <MemberList members={projectMembers} />
          <button
            type="button"
            onClick={() => router.push(`/projects/${projectId}/manage`)}
            className="cursor-pointer"
          >
            프로젝트 설정
          </button>
        </div>
      </aside>
      <main className="max-w-[830px] flex flex-col gap-16">
        {projectInfo && (
          <ProjectInfo
            projectId={projectId}
            {...projectInfo}
            onChangeInfo={setProjectInfo}
          />
        )}

        <hr className="text-mtm-light-gray" />
        <ProjectRecruitInfo projectId={projectId} {...projectRecruit} />
      </main>
    </div>
  );
}
