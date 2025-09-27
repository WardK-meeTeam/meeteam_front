import { authFetch } from "./authFetch";

export const getUserProfile = async () => {
  const response = await authFetch(`/api/members`);

  if (!response.ok) {
    throw new Error("사용자 정보를 가져오는데 실패했습니다.");
  }
  const data = await response.json();

  return data.result;
};
