import { authFetch } from "./authFetch";

export const getUserProfile = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) return null;
  const API = process.env.NEXT_PUBLIC_API_BASE_URL;

  const response = await authFetch(`${API}/api/members`);

  if (!response.ok) {
    throw new Error("사용자 정보를 가져오는데 실패했습니다.");
  }
  const data = await response.json();

  return data.result;
};
