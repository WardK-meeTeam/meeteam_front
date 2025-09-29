"use client";

import { GitPullRequest } from "lucide-react";
import PullRequestRow from "./pull-request-row";
import { useEffect, useState } from "react";
import { getAllPr } from "@/api/github";
import { RepoSummary } from "../GithubClient";

interface PullRequest {
  id: string; // DB상의 PR 번호
  prNumber: string;
  title: string;
  body: string;
  state: "open" | "closed";
  merged: boolean;
  authorLogin: string;
  additions: string;
  deletions: string;
  commentsCount: string;
}

interface PullRequestListProps {
  repository: RepoSummary;
}

export function PullRequestList({ repository }: PullRequestListProps) {
  const [pullRequests, setPullRequests] = useState<PullRequest[] | null>([]);
  useEffect(() => {
    const run = async () => {
      try {
        const response = await getAllPr(repository.repoFullName);
        if (response.success) {
          console.log(response.data);
          setPullRequests(response.data.result);
        } else {
          alert("PR 조회에 실패하였습니다.");
        }
      } catch (error) {
        alert(`PR조회에 실패하였습니다. : ${error}`);
      }
    };

    run();
  }, [repository]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "border-green-500/20 bg-green-500/10 text-green-700";
      case "merged":
        return "border-purple-500/20 bg-purple-500/10 text-purple-700";
      case "closed":
        return "border-red-500/20 bg-red-500/10 text-red-700";
      default:
        return "border-gray-500/20 bg-gray-500/10 text-gray-700";
    }
  };

  if (!pullRequests) return <div>로딩중..</div>;

  return (
    <div className="h-fit rounded-lg border border-mtm-light-gray shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="flex items-center gap-2 text-xl font-semibold leading-none tracking-tight">
          <GitPullRequest className="h-5 w-5" />
          Pull Requests
          <span className="ml-auto rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
            {pullRequests.length}개
          </span>
        </h3>
      </div>
      <div className="space-y-4 p-6 pt-0">
        {pullRequests.length === 0 ? (
          <div className="py-8 text-center">
            <GitPullRequest className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground">
              이 레포지토리에는 Pull Request가 없습니다.
            </p>
          </div>
        ) : (
          pullRequests.map((pr) => (
            <PullRequestRow
              key={pr.id}
              pr={pr}
              repository={repository}
              getStatusColor={getStatusColor}
            />
          ))
        )}
      </div>
    </div>
  );
}
