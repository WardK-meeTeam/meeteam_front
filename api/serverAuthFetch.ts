// api/serverAuthFetch.ts
import { cookies } from 'next/headers';
import { refreshAccessToken } from './authFetch';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// 서버 컴포넌트 전용 authFetch
export const serverAuthFetch = async (
  path: string,
  options: RequestInit = {},
): Promise<Response> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
  };

  const url = `${API_BASE_URL}${path}`;
  let response = await fetch(url, { ...options, headers });

  // 401 에러 시 토큰 갱신 시도
  if (response.status === 401) {
    const newAccessToken = await refreshAccessToken();

    if (newAccessToken) {
      // 토큰 저장 X -> 변경 필요
      const newHeaders = {
        ...headers,
        Authorization: `Bearer ${newAccessToken}`,
      };
      console.log("서버에서 새로운 액세스 토큰으로 재요청 시도중....");
      
      response = await fetch(url, { ...options, headers: newHeaders });
    } else {
      console.log("세션이 만료 로그인 후 시도");
    }
  }

  return response;
};