// refresh 토큰과 access 토큰 검증 작업을 한번에 진행해줌
// 토큰이 필요한 API호출은 앞으로 무조건 이 함수를 통해서 해주기를 바람!
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// 먼저 쿠키에 저장된 리프레시 토큰으로 액세스 토큰 발급 후 저장 및 반환하는 함수 
export async function refreshAccessToken(): Promise<string | null> {
  try {
    /* 쿠키에서 리프레시 토큰 가져오기 */
    console.log("리프레시 토큰 발급 시도중....");

    let refreshToken: string | undefined;
    // 서버 사이드
    if(typeof window === 'undefined') {
      const { cookies } = await import('next/headers');
      const cookieStore = await cookies();
      refreshToken = cookieStore.get("refreshToken")?.value;
      console.log(refreshToken); //**** 개발 서버에서는 쿠키 도메인 refreshToken이 브라우저 -> 서버로 안넘어감. (배포 시 도메인 통합 예정)
    } 
    // 클라이언트 사이드
    else {
      refreshToken = Cookies.get("refreshToken");
    }
    
    if(!refreshToken) {
      return null;
    } // 리프레시 토큰이 없으면 리프레시 토큰 발급 실패

    const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Cookie": `refreshToken=${refreshToken}`,
      },
    }); // 리프레시 토큰으로 액세스 토큰 발급 요청

    console.log(response);
    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    const newAccessToken = data.result.accessToken;

    if(window !== undefined) { // 클라이언트 사이드에서만 쿠키에 저장
      Cookies.set("accessToken", newAccessToken);
    }

    return newAccessToken;
  } catch (error) {
    console.error("refresh토큰으로 accessToken 가져오기 실패", error);
    return null;
  }
}

// 서버/클라이언트 사이드 공용 authFetch 함수 (헤더에 accessToken 주입)
export const authFetch = async (
  path: string,
  options: RequestInit = {},
): Promise<Response> => {
  const url = `${API_BASE_URL}${path}`;
  let accessToken: string | undefined;

  /* 쿠키에서 액세스 토큰 가져오기 */
  // 서버 사이드
  if(typeof window === 'undefined') {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    accessToken = cookieStore.get("accessToken")?.value;
  }
  // 클라이언트 사이드
  else {
    accessToken = Cookies.get("accessToken");
  }

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
      /* 로그아웃 - 쿠키 삭제 */
      // 서버 사이드
      if(typeof window === 'undefined') {
        // 배포 서버에서는 예외 발생시킴
        throw new Error("SESSION_EXPIRED");
      }
      // 클라이언트 사이드
      else {
        // Cookies.remove("accessToken");
        // Cookies.remove("refreshToken");
        // // 클라이언트 사이드에서는 로그인 페이지 리다이렉트
        // alert("로그인 후 시도하세요");
        // window.location.href = "/signin";
      }
    }
  }

  return response;
};
