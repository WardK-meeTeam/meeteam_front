// refresh 토큰과 access 토큰 검증 작업을 한번에 진행해줌
// 토큰이 필요한 API호출은 앞으로 무조건 이 함수를 통해서 해주기를 바람!
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// 먼저 쿠키에 저장된 리프레시 토큰으로 액세스 토큰 가져오는 함수 정의

export async function refreshAccessToken(): Promise<string | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) {
      //리프레시 토큰 만료 = 세션 아웃  -> 다시 로그인 시키게 해야함
      console.log("세션이 만료되었습니다. 로그인 후 시도하세요");
      return null;
    }

    const data = await response.json();
    const newAccessToken = data.result; // 새 액세스 토큰 받음

    console.log(data); // 테스트용
    if(typeof window !== 'undefined') {
      localStorage.setItem("accessToken", newAccessToken);
      Cookies.set("accessToken", newAccessToken, { 
        expires: 1, // 1일
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production'
      });
    }

    return newAccessToken;
  } catch (error) {
    console.log("refresh토큰으로 accessToken 가져오기 실패", error);
    return null;
  }
}

// 액세스 토큰을 필요로 하는 API는 authFetch를 이용해서 fetch를 하면 끝!!
// 이거 하나로 통일시킴
export const authFetch = async (
  url: string,
  options: RequestInit = {},
): Promise<Response> => {
  const accessToken = localStorage.getItem("accessToken");

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
  };

  let response = await fetch(url, { ...options, headers });

  // 만약 accessToken을 담아서 요청했는데, 401에러가 뜨면 액세스 토큰이 만료된거임
  // 따라서 액세스 토큰 재발급 필요
  if (response.status === 401) {
    // 401 -> Unautorized
    const newAccessToken = await refreshAccessToken();

    if (newAccessToken) {
      const newHeaders = {
        ...headers,
        Authorization: `Bearer ${newAccessToken}`,
      };
      console.log("새로운 액세스 토큰으로 서버에 재요청 시도중....");
      // 업데이트 된 액세스 토큰을 새로운 헤더에 담아 fetch 다시 진행
      response = await fetch(url, { ...options, headers: newHeaders });
    } else {
      // 리프레시 토큰으로 액세스 토큰 발급이 실패함 -> 리프레시 토큰도 만료되었다는 뜻
      // 로그아웃 시킴
      localStorage.removeItem("accessToken");
      alert("세션이 만료되었습니다. 로그인 후 시도하세요");
      window.location.href = "/signin";
    }
  }

  return response;
};
