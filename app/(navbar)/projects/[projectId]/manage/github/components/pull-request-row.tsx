import { GitPullRequest, MessageSquare, User, Link } from "lucide-react";
import { RepoSummary } from "../GithubClient";
import { startPrReview } from "@/api/github";
import { PullRequest } from "@/types/github";

interface PullRequestRowProps {
  pr: PullRequest;
  getStatusColor: (status: string) => string;
  repository: RepoSummary;
}

export default function PullRequestRow({
  pr,
  getStatusColor,
  repository,
}: PullRequestRowProps) {
  const handleConnect = async (repoId: string, prNumber: string) => {
    try {
      const response = await startPrReview(repoId, prNumber);
      if (response.success) {
        alert("PR 리뷰를 시작합니다.");
      } else {
        alert(response.error.message);
      }
    } catch (error) {
      alert(`PR 리뷰를 시작하지 못 했습니다. (${error})`);
    }
  };
  return (
    <div className="rounded-lg border border-mtm-light-gray p-4 transition-all hover:shadow-md">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <h3 className="text-balance font-semibold text-foreground">
              {pr.title}
            </h3>
            <span
              className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${getStatusColor(
                pr.state,
              )}`}
            >
              {pr.state}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-700">
            <span className="flex items-center gap-1">
              <GitPullRequest className="h-3 w-3" />#{pr.prNumber}
            </span>
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {pr.authorLogin}
            </span>

            <span className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              {pr.commentsCount}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="text-green-600">+{pr.additions}</span>
          <span className="text-red-600">-{pr.deletions}</span>
        </div>
        <button
          onClick={() =>
            handleConnect(String(repository.repoId), String(pr.prNumber))
          }
          type="button"
          className="inline-flex items-center justify-center gap-2
          bg-mtm-github-black text-white px-3 py-2
           whitespace-nowrap rounded-md text-sm font-semibold transition-colors 
           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          <Link className="h-4 w-4" /> 연결
        </button>
      </div>
    </div>
  );
}
