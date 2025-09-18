export const fetchUser = async (userId: string) => {
  const API = process.env.NEXT_PUBLIC_API_BASE_URL;
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("로그인이 필요합니다.");
  }

  const response = await fetch(`${API}/api/members/${userId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "유저 정보 조회에 실패했습니다.");
  }

  return response.json();
};
