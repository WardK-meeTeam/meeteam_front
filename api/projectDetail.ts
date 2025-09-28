import { authFetch } from "./authFetch";

export const getProjectDetail = async (projectId: string) => {
  const response = await authFetch(`/api/projects/V2/${projectId}`);

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
