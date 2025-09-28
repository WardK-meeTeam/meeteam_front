import { authFetch } from "./authFetch";

export const getProjectLike = async (projectId: string) => {
  const response = await authFetch(`/api/project/like/${projectId}`);
  if (response.ok) {
    const data = await response.json();
    return {
      success: true,
      liked: data.result.status,
    };
  } else {
    const errorData = await response.json();
    return {
      success: false,
      message: errorData.message,
    };
  }
};

export const postProjectLike = async (projectId: string) => {
  const response = await authFetch(
    `/api/project/like/${projectId}`,
    {
      method: "POST",
    },
  );
  if (response.ok) {
    const data = await response.json();
    return {
      success: true,
      liked: data.result.liked,
      likeCount: data.result.likeCount,
    };
  } else {
    const errorData = await response.json();
    return {
      success: false,
      message: errorData.message,
    };
  }
};
