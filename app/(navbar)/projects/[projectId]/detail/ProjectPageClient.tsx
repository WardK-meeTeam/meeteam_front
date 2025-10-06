"use client";

import { useEffect, useState, useCallback } from "react";
import MemberList from "../components/MemberList";
import ProjectInfo from "./components/ProjectInfo";
import ProjectRecruitInfo from "./components/ProjectRecruitInfo";
import {
  Member,
  ProjectInfoItem,
  ProjectRecruitInfoItem,
} from "@/types/projectInfo";
import { useRouter } from "next/navigation";
import { authFetch } from "@/api/authFetch";
import ArrowIcon from "@/public/images/right_arrow_icon.svg";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export default function ProjectPageClient({
  projectId,
}: {
  projectId: string;
}) {
  const { user, isLoading } = useAuth();
  const [projectMembers, setProjectMembers] = useState<Member[]>([]);
  const [isCreator, setIsCreator] = useState(false);
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

  // 로그인한 사용자가 해당 프로젝트의 생성자인지 확인
  useEffect(() => {
    if (isLoading || projectMembers.length === 0) return;
    if (
      projectMembers.filter(
        (member) =>
          member.creator === true && member.memberId === user?.memberId,
      ).length === 0
    ) {
      setIsCreator(false);
      return;
    }

    setIsCreator(true);
  }, [projectMembers, isLoading, user?.memberId]);
  return (
    <div className="flex flex-row gap-16 max-w-7xl mx-auto pb-24">
      <aside className="w-[194px] flex-1">
        <div className="sticky top-20 z-10 flex flex-col gap-3">
          <span className="text-[14px]">프로젝트를 함께할 사람들</span>
          <MemberList members={projectMembers} projectId={projectId} />
          {isCreator && (
            <button
              type="button"
              onClick={() => router.push(`/projects/${projectId}/manage`)}
              className="cursor-pointer flex justify-between p-3 border border-mtm-light-gray rounded-xl
            transition-all duration-200 ease-in-out hover:bg-mtm-light-purple
            "
            >
              <span className="text-[14px] text-mtm-purple">프로젝트 설정</span>
              <Image src={ArrowIcon} alt="arrow" width={8} height={12} />
            </button>
          )}
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

        {/* <hr className="text-mtm-light-gray" /> */}
        <ProjectRecruitInfo projectId={projectId} {...projectRecruit} />
      </main>
    </div>
  );
}
