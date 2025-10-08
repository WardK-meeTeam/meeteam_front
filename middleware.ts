import { NextRequest, NextResponse } from "next/server";
import { isTokenNearExpiry, isTokenExpired } from '@/utils/token';
import { RequestCookies, ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";

function applySetCookie(req: NextRequest, res: NextResponse): void {
  // parse the outgoing Set-Cookie header
  const setCookies = new ResponseCookies(res.headers);
  // Build a new Cookie header for the request by adding the setCookies
  const newReqHeaders = new Headers(req.headers);
  const newReqCookies = new RequestCookies(newReqHeaders);
  setCookies.getAll().forEach((cookie) => newReqCookies.set(cookie));
  // set “request header overrides” on the outgoing response
  NextResponse.next({ request: { headers: newReqHeaders },}).headers.forEach((value, key) => {
    if (key === 'x-middleware-override-headers' || key.startsWith('x-middleware-request-')) {
      res.headers.set(key, value);
    }
  });
}

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  
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
    return logout();
  }

  if (refreshToken && accessToken && isTokenNearExpiry(accessToken)) {
    //토큰 갱신
    console.log("토큰 갱신 시도중....");
    try {
      const accessTokenResponse = await fetch(`${process.env.APP_BASE_URL}/api/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          cookie: `refreshToken=${refreshToken}`,
        },
        credentials: 'include',
      });
      // API를 호출하여 새 액세스 토큰과 리프레시 토큰을 요청

      console.log('accessToken: ', accessToken);
      console.log('refreshToken: ', refreshToken);

      if (!accessTokenResponse.ok) {
        // 응답이 성공적이지 않으면 로그아웃
        return logout();
      }
      const data = await accessTokenResponse.json();
      const newAccessToken = data.result;
      
      if (newAccessToken) {
        console.log('newAccessToken: ', newAccessToken);
        // 응답이 성공적이면 새 액세스 토큰으로 쿠키 설정하고 다음 요청 진행
        const res = NextResponse.next();
        res.cookies.set('accessToken', newAccessToken, {
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/'
        });
        applySetCookie(request, res);
        return res;
      }
    } catch (error) {
      console.error("토큰 갱신 실패", error);
      return logout();
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