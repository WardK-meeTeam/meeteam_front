"use client";

import { useEffect, useState } from "react";
import { PullRequestList } from "./components/pull-request-list";
import { RepositoryList } from "./components/repository-list";
import RepositoryManagement from "./components/RepositoryManagement";
import { getProjectDetail } from "@/api/projectDetail";
import ProjectManageHeader from "../components/ProjectManageHeader";
import { getAllRepo } from "@/api/github";
import { Repository } from "@/types/github";

export interface RepoSummary {
  repoFullName: string;
  repoId: number;
}

export default function GithubClient({ projectId }: { projectId: string }) {
  const [selectedRepository, setSelectedRepository] =
    useState<RepoSummary | null>(null);
  const [repos, setRepos] = useState<Repository[] | null>([]);
  const [projectName, setProjectName] = useState("");

  const fetchRepos = async () => {
    try {
      const response = await getAllRepo(projectId);
      if (response.success) {
        setRepos(response.data.result);
      } else {
        alert("레포지토리 조회에 실패하였습니다.");
      }
    } catch (error) {
      alert(`레포지토리 조회에 실패하였습니다. : ${error}`);
    }
  };

  useEffect(() => {
    const fetchProjectName = async () => {
      const response = await getProjectDetail(projectId);
      if (response.success) {
        setProjectName(response.data.name);
      }
    };

    fetchRepos();
    fetchProjectName();
  }, [projectId]);

  return (
    <main className="mx-auto mt-10 w-11/12 max-w-7xl min-w-5xl">
      <ProjectManageHeader
        projectId={projectId}
        projectName={projectName}
        subPageName="Github 연동 관리"
      />
      <RepositoryManagement projectId={projectId} onRepoConnect={fetchRepos} />
      <div className="flex flex-col text-[14px] mt-10">
        <span className="text-mtm-purple">Step3.</span>
        <span>AI 리뷰를 원하는 Pull Request를 선택 해주세요!</span>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-8 lg:grid-cols-2 pb-20">
        <div>
          <RepositoryList
            repos={repos}
            selectedRepository={selectedRepository}
            onRepositorySelect={setSelectedRepository}
          />
        </div>
        <div>
          {selectedRepository ? (
            <PullRequestList repository={selectedRepository} />
          ) : (
            <div className="flex h-96 items-center justify-center rounded-lg border border-mtm-light-gray">
              <p className="text-lg">
                레포지토리를 선택하여 Pull Request를 확인하세요
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
