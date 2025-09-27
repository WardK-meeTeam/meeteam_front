import { authFetch } from "./authFetch";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getProjectLike = async (projectId: string) => {
  const response = await authFetch(`${BASE_URL}/api/project/like/${projectId}`);
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
    `${BASE_URL}/api/project/like/${projectId}`,
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
