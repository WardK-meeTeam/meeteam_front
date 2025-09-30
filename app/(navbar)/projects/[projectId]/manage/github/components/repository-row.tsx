import { Star, Eye } from "lucide-react";
import { RepoSummary } from "../GithubClient";

interface Repository {
  id: string;
  repoFullName: string;
  description: string;
  starCount: number;
  language: string;
  watcherCount: number;
  pushedAt: string;
}

interface RepositoryRowProps {
  repo: Repository;
  selectedRepository: RepoSummary | null;
  onRepositorySelect: (repoSummary: RepoSummary) => void;
  getLanguageColor: (language: string) => string;
}

export default function RepositoryRow({
  repo,
  selectedRepository,
  onRepositorySelect,
  getLanguageColor,
}: RepositoryRowProps) {
  return (
    <div
      key={repo.id}
      className={`cursor-pointer rounded-lg border p-4 transition-all hover:shadow-md ${
        selectedRepository?.repoId === repo.id
          ? "border-mtm-github-black bg-gray-100"
          : "border-mtm-light-gray hover:border-mtm-github-black"
      }`}
      onClick={() =>
        onRepositorySelect({
          repoFullName: repo.repoFullName,
          repoId: repo.id,
        })
      }
    >
      <div className="mb-2 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-foreground">{repo.repoFullName}</h3>
        </div>
        <span className="text-xs text-gray-700">
          {new Date(repo.pushedAt).toLocaleString("ko-KR", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </span>
      </div>

      <p className="mb-3 line-clamp-2 text-sm text-gray-700">
        {repo.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div
              className={`h-3 w-3 rounded-full ${getLanguageColor(
                repo.language,
              )}`}
            ></div>
            <span className="text-xs text-gray-700">{repo.language}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 text-gray-700" />
            <span className="text-xs text-gray-700">{repo.starCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-3 w-3 text-gray-700" />
            <span className="text-xs text-gray-700">{repo.watcherCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
