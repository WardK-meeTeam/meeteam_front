// app/api/auth/refresh/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",  // refreshToken 포함
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "로그인 후 시도하세요" },
        { status: 401 }
      );
    }

    const data = await response.json();
    const newAccessToken = data.result;

    // 새로운 Response 객체 생성 (성공 응답)
    const nextResponse = NextResponse.json(
      { message: "토큰 갱신 성공", 
        result: {
          accessToken: newAccessToken },
      },
      { status: 200 }
    );

    // 새 accessToken을 쿠키에 설정
    nextResponse.cookies.set({
      name: "accessToken",
      value: newAccessToken,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1일
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/"
    });

    return nextResponse;

  } catch (error) {
    console.log("refresh토큰으로 accessToken 가져오기 실패", error);
    return NextResponse.json(
      { message: "토큰 갱신 중 오류 발생" },
      { status: 500 }
    );
  }
}