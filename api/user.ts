import { authFetch } from "./authFetch";

export const getUserProfile = async () => {
  try {
    const response = await authFetch(`/api/members`);

    if (!response.ok) {
      return null;
    }
    const data = await response.json();

    return data.result;
  } catch (error) {
    console.error("유저 정보 조회 실패", error);
    return null;
  }
};
