"use client";

import { useState } from "react";
import { PullRequestList } from "./components/pull-request-list";
import { RepositoryList } from "./components/repository-list";

export interface RepoSummary {
  repoFullName: string;
  repoId: string;
}

export default function GithubClient({ projectId }: { projectId: string }) {
  const [selectedRepositoryName, setSelectedRepositoryName] =
    useState<RepoSummary | null>(null);

  return (
    <main className="mx-auto mt-10 w-11/12 max-w-7xl min-w-5xl">
      <h1 className="mb-11 text-4xl font-extrabold">Github 연동 관리</h1>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <RepositoryList
            projectId={projectId}
            selectedRepository={selectedRepositoryName}
            onRepositorySelect={setSelectedRepositoryName}
          />
        </div>
        <div>
          {selectedRepositoryName ? (
            <PullRequestList repository={selectedRepositoryName} />
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
