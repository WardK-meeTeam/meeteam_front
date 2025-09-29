import { authFetch } from "./authFetch";

// 1. PR 리뷰 시작
export const startPrReview = async (repoId: string, prNumber: string) => {
  const response = await authFetch(
    `/api/codereviews/start?repoId=${repoId}&prNumber=${prNumber}`,
    {
      method: "POST",
    },
  );
  if (response.ok) {
    const data = await response.json();

    return {
      success: true,
      data: data,
    };
  } else {
    const errorData = await response.json();

    return {
      success: false,
      error: errorData,
    };
  }
};

// 2. 프로젝트에 연결된 레포 목록 조회

export const getAllRepo = async (projectId: string) => {
  const response = await authFetch(`/api/projects/${projectId}/repos`);
  if (response.ok) {
    const data = await response.json();

    return {
      success: true,
      data: data,
    };
  } else {
    const errorData = await response.json();

    return {
      success: false,
      error: errorData,
    };
  }
};

// 3. 레포에 연결된 PR 목록 조회

export const getAllPr = async (repoFullName: string) => {
  const [owner, repo] = repoFullName.split("/");
  console.log(owner, repo);
  const response = await authFetch(`/api/prs/${owner}/${repo}`);
  if (response.ok) {
    const data = await response.json();

    return {
      success: true,
      data: data,
    };
  } else {
    const errorData = await response.json();

    return {
      success: false,
      error: errorData,
    };
  }
};
