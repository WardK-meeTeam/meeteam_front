export async function loginWithEmail(loginFormData: {
  email: string;
  password: string;
}) {
  const API = process.env.NEXT_PUBLIC_API_BASE_URL;
  const response = await fetch(`${API}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginFormData),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
  }

  const data = await response.json();
  const userId = data.result.memberId;
  const receivedAcessToken = response.headers.get("Authorization")!.slice(7); // Bearer 토큰 이런식으로 와서 앞에 7자리 자르고 액세스 토큰만 저장

  return {
    userId: userId,
    accessToken: receivedAcessToken,
  };
}
