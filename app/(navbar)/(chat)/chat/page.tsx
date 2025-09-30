"use client";
import { useRouter } from "next/navigation";
import SuggestionCard from "./components/SuggestionCard";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export default function ChatBasePage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [firstProject, setFirstProject] = useState<number>(0);

  useEffect(() => {
    if (isLoading) return;
    if (user?.projectList.length !== 0) {
      setFirstProject(user?.projectList[0].projectId ?? 0);
    }
  }, [user, isLoading]);

  const handleClickReview = () => {
    if (firstProject === 0) {
      alert("참여하고 있는 프로젝트가 없습니다!");
      return;
    }
    router.push(`/projects/${firstProject}/manage`);
  };

  console.log(firstProject);

  return (
    <main className="flex flex-col h-full w-full items-center">
      <div className="flex-1 flex flex-col justify-center items-center w-full max-w-4xl">
        <h1 className="text-5xl font-bold text-mtm-main-blue mb-16">
          meeTeam PR 리뷰
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SuggestionCard
            title="프로젝트 생성하기"
            description="프로젝트를 먼저 생성해보세요."
            onClick={() => router.push("projects/create")}
          />
          <SuggestionCard
            title="PR 리뷰 요청하기"
            description="미팀 봇을 설치하고 PR리뷰를 요청해보세요."
            onClick={handleClickReview}
          />
        </div>
      </div>
    </main>
  );
}
