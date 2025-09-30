export interface PullRequest {
  id: number; // DB상의 PR 번호
  prNumber: number;
  title: string;
  body: string;
  state: "open" | "closed";
  merged: boolean;
  authorLogin: string;
  additions: number;
  deletions: number;
  commentsCount: number;
}

export interface Repository {
  id: number;
  repoFullName: string;
  description: string;
  starCount: number;
  language: string;
  watcherCount: number;
  pushedAt: string;
}
