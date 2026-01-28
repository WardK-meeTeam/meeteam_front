"use client";

// 구글, 깃헙 인증 성공 후 리다이렉트 처리할 페이지
import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthBootstrap } from "@/hooks/useAuthBootstrap";

async function RedirectLogic() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    const type = searchParams.get("type");

    const exchangeLoginToken = async (code, router) => {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
      const { LoginInit } = useAuthBootstrap();
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/auth/token/exchange`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              code: code,
            }),
          },
        );

        if (!response.ok) {
          const errorData = await response.json();
          if (errorData.code === "OAUTH404") {
            alert("인증이 만료되었습니다. 다시 로그인해주세요.");
          } else {
            alert(errorData.message || "로그인에 실패했습니다.");
          }
          router.replace("/signin");
          return;
        }

        const data = await response.json();

        LoginInit(data.result.accessToken);

        router.replace("/");
      } catch (error) {
        console.error("토큰 교환 중 네트워크 오류:", error);
        alert("네트워크 오류가 발생했습니다.");
        router.replace("/signin");
      }
    };

    if (type === "login") {
      // → 2번 섹션: 토큰 교환 API 호출
      exchangeLoginToken(code, router);
    } else if (type === "register") {
      // → 3번 섹션: code를 저장하고 회원가입 폼으로 이동
      sessionStorage.setItem("oauthCode", code);
      router.replace("/signup/profile/setting"); // React Router 등
    }

    window.history.replaceState({}, document.title, window.location.pathname);
  }, [searchParams, router]);

  // To-Do
  // 로딩화면도 애니메이션 넣거나 그러면 좋을듯
  return (
    <div>
      <h1>로그인 중입니다...</h1>
      <p>잠시만 기다려주세요.</p>
    </div>
  );
}

export default function OAuthRedirectPage() {
  return (
    <Suspense>
      <RedirectLogic />
    </Suspense>
  );
}
