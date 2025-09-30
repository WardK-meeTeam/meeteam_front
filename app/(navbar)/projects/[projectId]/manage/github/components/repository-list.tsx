"use client";

import { useState } from "react";
import { Search, GitBranch } from "lucide-react";
import RepositoryRow from "./repository-row";
import { RepoSummary } from "../GithubClient";
import { Repository } from "@/types/github";

interface RepositoryListProps {
  repos: Repository[] | null;
  selectedRepository: RepoSummary | null;
  onRepositorySelect: (repoSummary: RepoSummary) => void;
}

export function RepositoryList({
  repos,
  selectedRepository,
  onRepositorySelect,
}: RepositoryListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  if (!repos) {
    return <div>Loading...</div>; // Or some other loading indicator
  }

  const filteredRepositories = repos.filter(
    (repo) =>
      repo.repoFullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (repo.description &&
        repo.description.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      TypeScript: "bg-blue-500",
      JavaScript: "bg-yellow-500",
      Python: "bg-green-500",
      Java: "bg-red-500",
      Go: "bg-cyan-500",
    };
    return colors[language] || "bg-gray-500";
  };

  return (
    <div className="h-fit rounded-lg border border-mtm-light-gray shadow-lg">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="flex items-center gap-2 text-xl mb-4 font-semibold leading-none tracking-tight">
          <GitBranch className="h-5 w-5 mt-1" />
          Repositories
        </h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
          <input
            placeholder="레포지토리명 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border border-mtm-light-gray bg-transparent px-3 py-2 pl-10 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-mtm-text-gray focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>
      <div className="space-y-3 p-6 pt-0">
        {filteredRepositories.map((repo) => (
          <RepositoryRow
            key={repo.id}
            repo={repo}
            selectedRepository={selectedRepository}
            onRepositorySelect={onRepositorySelect}
            getLanguageColor={getLanguageColor}
          />
        ))}
      </div>
    </div>
  );
}
