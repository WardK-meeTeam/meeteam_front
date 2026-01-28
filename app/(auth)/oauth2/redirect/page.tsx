"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthBootstrap } from "@/hooks/useAuthBootstrap";

function RedirectLogic() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { LoginInit } = useAuthBootstrap();

  // ✅ searchParams 객체 자체가 아니라 "값"을 deps로 쓰기
  const code = useMemo(() => searchParams.get("code"), [searchParams]);
  const type = useMemo(() => searchParams.get("type"), [searchParams]);

  // ✅ 중복 실행 방지 (StrictMode / 리렌더 / 뒤로가기 등)
  const onceRef = useRef(false);

  useEffect(() => {
    if (onceRef.current) return;
    onceRef.current = true;

    // ✅ 파라미터 검증
    if (!code || !type) {
      alert("인증 정보가 올바르지 않습니다. 다시 로그인해주세요.");
      router.replace("/signin");
      return;
    }

    // ✅ URL에서 파라미터 제거 (보안: code 노출 최소화)
    // Next router로 pathname만 replace하면, query 제거가 확실하게 됨
    // (현재 페이지 경로가 /oauth2/redirect 라고 가정)
    router.replace("/oauth2/redirect");

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!API_BASE_URL) {
      console.error("NEXT_PUBLIC_API_BASE_URL is not set");
      alert("환경 설정 오류가 발생했습니다. 관리자에게 문의해주세요.");
      router.replace("/signin");
      return;
    }

    const exchangeLoginToken = async () => {
      // 네트워크 요청 중 페이지 이탈 시 안전하게 중단
      const controller = new AbortController();

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/auth/token/exchange`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ code }),
            signal: controller.signal,
          },
        );

        // 에러 응답이 JSON 아닐 수도 있으니 방어적으로 처리
        const safeJson = async () => {
          try {
            return await response.json();
          } catch {
            return null;
          }
        };

        if (!response.ok) {
          const errorData = await safeJson();
          if (errorData?.code === "OAUTH404") {
            alert("인증이 만료되었습니다. 다시 로그인해주세요.");
          } else {
            alert(errorData?.message || "로그인에 실패했습니다.");
          }
          router.replace("/signin");
          return;
        }

        const data = await response.json();

        // ✅ accessToken 저장/초기화 로직
        LoginInit(data.result.accessToken);

        router.replace("/");
      } catch (error: any) {
        if (error?.name === "AbortError") return;
        console.error("토큰 교환 중 네트워크 오류:", error);
        alert("네트워크 오류가 발생했습니다.");
        router.replace("/signin");
      }

      return () => controller.abort();
    };

    if (type === "login") {
      exchangeLoginToken();
      return;
    }

    if (type === "register") {
      // ✅ register일 때도 code 검증은 위에서 이미 끝났음
      sessionStorage.setItem("oauthCode", code);
      router.replace("/signup/profile/setting");
      return;
    }

    // ✅ type 이상한 값이면 방어
    alert("인증 정보가 올바르지 않습니다. 다시 로그인해주세요.");
    router.replace("/signin");
  }, [code, type, router, LoginInit]);

  return (
    <div>
      <h1>로그인 중입니다...</h1>
      <p>잠시만 기다려주세요.</p>
    </div>
  );
}

export default function OAuthRedirectPage() {
  return (
    <Suspense fallback={<div>처리 중...</div>}>
      <RedirectLogic />
    </Suspense>
  );
}
