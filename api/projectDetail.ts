import { authFetch } from "./authFetch";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getProjectDetail = async (projectId: string) => {
  const response = await authFetch(
    `${BASE_URL}/api/projects/V2/${projectId}`,
    {},
  );

  if (response.ok) {
    const data = await response.json();
    return {
      success: true,
      data: data.result,
    };
  } else {
    const errorData = await response.json();
    return {
      success: false,
      data: errorData,
    };
  }
};
