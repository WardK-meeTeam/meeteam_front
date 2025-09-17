"use client";

import { useEffect } from "react";
import MemberList from "../components/MemberList";
import ProjectInfo from "../components/ProjectInfo";
import ProjectRecruitInfo from "../components/ProjectRecruitInfo";

export default function ProjectPageClient({
  projectId,
}: {
  projectId: string;
}) {
  const API = process.env.NEXT_PUBLIC_API_BASE_URL;

  const fetchProjectDetail = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;
    const response = await fetch(`${API}/api/projects/V2/${projectId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      console.log("굿", await response.json());
    } else {
      console.log(await response.json());
    }
  };

  useEffect(() => {
    fetchProjectDetail();
  }, [projectId]);
  return (
    <div className="flex flex-row gap-16 max-w-7xl mx-auto pb-24">
      <aside className="w-[194px] flex-1">
        <div className="sticky top-20 z-10 flex flex-col gap-3">
          <span className="text-[14px]">프로젝트를 함께할 사람들</span>
          <MemberList />
        </div>
      </aside>
      <main className="max-w-[830px] flex flex-col gap-16">
        <ProjectInfo projectId={projectId} />
        <hr className="text-mtm-light-gray" />
        <ProjectRecruitInfo projectId={projectId} />
      </main>
    </div>
  );
}
