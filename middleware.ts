import { NextRequest, NextResponse } from "next/server";
import { isTokenNearExpiry, isTokenExpired } from '@/utils/token';
import { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";

export async function middleware(request: NextRequest, response: NextResponse) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  console.log('request.cookies.getAll(): ', request.cookies.getAll());
  console.log('accessToken: ', accessToken);
  console.log('refreshToken: ', refreshToken);
  
  const logout = () => {
    const res = NextResponse.redirect(new URL('/signin', request.url));
    res.cookies.delete('accessToken');
    res.cookies.delete('refreshToken');
    return res;
  }
  
  if(
    (!accessToken || !refreshToken) || // 액세스 토큰 또는 리프레시 토큰이 없으면 로그인 페이지로 리다이렉트 로그아웃
    (refreshToken && isTokenExpired(refreshToken)) // 리프레시 토큰이 있더라도 리프레시 토큰이 만료되었으면 로그아웃
  ) {
    logout();
  }

  if (refreshToken && accessToken && isTokenNearExpiry(accessToken)) {
    //토큰 갱신
    console.log("토큰 갱신 시도중....");
    try {
      const response = await fetch("/api/auth/refresh", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          cookie: `refreshtoken=${refreshToken}`,
        },
        credentials: 'include',
      });
      // API를 호출하여 새 액세스 토큰과 리프레시 토큰을 요청

      if (!response.ok) {
        // 응답이 성공적이지 않으면 로그아웃
        logout();
      }

      if (response.ok) {
        // 응답이 성공적이면 다음 요청을 처리
        const res = NextResponse.next();
        const responseCookies = new ResponseCookies(response.headers);
        // 응답 헤더에서 쿠키를 읽음

        const accessToken = responseCookies.get('accesstoken');
        // 응답에서 'accesstoken' 쿠키를 가져옴

        const refreshToken = responseCookies.get('refreshtoken');
        // 응답에서 'refreshtoken' 쿠키를 가져옴

        if (accessToken) {
          // 새 액세스 토큰을 설정
          res.cookies.set('accesstoken', accessToken.value, {
            httpOnly: accessToken.httpOnly,
            sameSite: accessToken.sameSite,
            path: accessToken.path,
            secure: accessToken.secure,
          });
        }
      }
    } catch (error) {
      logout();
      console.error("토큰 갱신 실패", error);
    }
  }

  console.log('인증된 사용자임. 다음 요청 진행.');
  return NextResponse.next();
};

export const config = {
  matcher: [
    "/chat/:path*", // 채팅 페이지
    "/application/:path*", // 지원 수락 페이지?
    "/callback", // 콜백 페이지
    "/notification/:path*", // 알림 페이지
    "/projects/create", // 프로젝트 생성 페이지
    "/users/edit", // 회원정보 수정 페이지
  ], // 인증 필요 페이지
};