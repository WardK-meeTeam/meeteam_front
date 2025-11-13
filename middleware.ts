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

function isAuthPage(pathname: string): boolean {
  const authPages = ['/signin', '/signup', '/signup/profile/setting'];
  return authPages.some(path => pathname.startsWith(path));
}

function isProtectedPage(pathname: string): boolean {
  // 동적 경로 패턴 (:projectId)
  if (pathname.match(/^\/projects\/[^/]+\/apply$/)) {
    return true; // /projects/:projectId/apply
  }
  if (pathname.match(/^\/projects\/[^/]+\/manage/)) {
    return true; // /projects/:projectId/manage/:path*
  }
  if (pathname.match(/^\/users\/[^/]+$/)) {
    return true; // /users/:userId
  }

  // 하위 경로 포함 (prefix 매칭)
  const prefixPaths = ['/chat', '/application', '/notification'];
  if (prefixPaths.some(path => pathname.startsWith(path))) {
    return true;
  }
  
  // 정확한 경로만
  const exactPaths = ['/projects/create', '/users/edit', '/callback'];
  return exactPaths.includes(pathname);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  console.log("accessToken: ", accessToken);
  console.log("refreshToken: ", refreshToken);

  const logout = () => {
    const res = NextResponse.redirect(new URL('/signin', request.url));
    res.cookies.delete('accessToken');
    res.cookies.delete('refreshToken');
    return res;
  }

  // 인증 페이지 체크 (이미 인증된 사용자 차단)
  if (isAuthPage(pathname) && refreshToken) {
    console.log("인증된 사용자는 접근 불가능한 페이지에 접근 시도 - 메인으로 리다이렉트");
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 보호된 페이지 체크 (인증된 사용자만 접근 가능)
  if(isProtectedPage(pathname)) {
    if(refreshToken && isTokenExpired(refreshToken)) { // refreshToken 만료 체크
      console.log("리프레시 토큰 만료 - 로그아웃");
      return logout();
    }
    if( !accessToken) { // accessToken, refreshToken 둘 다 체크
      console.log("리프레시 또는 액세스 토큰이 없음 - 로그인 페이지로 리다이렉트");
      return NextResponse.redirect(new URL('/signin', request.url));
    }
  }

  //accessToken 만료 체크 후 토큰 갱신
  if (refreshToken && accessToken && isTokenNearExpiry(accessToken)) { // accessToken 만료 체크
    console.log("토큰 갱신 시도중...");
    try {
      const accessTokenResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          cookie: `refreshToken=${refreshToken}`,
        },
        credentials: 'include',
      });
      // API를 호출하여 새 액세스 토큰과 리프레시 토큰을 요청

      if (!accessTokenResponse.ok) {
        // 응답이 성공적이지 않으면 로그아웃
        return logout();
      }

      const data = await accessTokenResponse.json();
      const newAccessToken = data.result;
      
      if (newAccessToken) {
        // 응답이 성공적이면 새 액세스 토큰으로 쿠키 설정하고 다음 요청 진행
        const res = NextResponse.next();
        res.cookies.set('accessToken', newAccessToken, {
          expires: 1,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/'
        });
        applySetCookie(request, res);
        console.log("토큰 갱신 성공 - 다음 요청 진행");
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
    '/', // 메인 페이지 - 토큰 갱신용
    /* 인증된 사용자만 접근 가능한 페이지 */
    "/chat/:path*", // 채팅 페이지
    "/application/:path*", // 지원 수락 페이지?
    "/callback", // 콜백 페이지
    "/notification/:path*", // 알림 페이지
    "/projects/create", // 프로젝트 생성 페이지
    "/projects/:projectId/manage/:path*", // 프로젝트 관리 페이지
    "/projects/:projectId/apply", // 프로젝트 수정 페이지
    "/users/edit", // 회원정보 수정 페이지
    "/users/:userId", // 회원 프로필 페이지

    /* 인증된 사용자는 접근 불가능한 페이지 (authPages) */
    "/signin", // 로그인 페이지
    "/signup", // 회원가입 페이지
    "/signup/profile/setting", // 회원정보 설정 페이지 
  ],
};