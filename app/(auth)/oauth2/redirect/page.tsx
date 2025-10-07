"use client";

// 구글, 깃헙 인증 성공 후 리다이렉트 처리할 페이지
import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthBootstrap } from "@/hooks/useAuthBootstrap";

function RedirectLogic() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { LoginInit } = useAuthBootstrap();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const type = searchParams.get("type");
    // type은 login or register

    if (accessToken && type) {
      localStorage.setItem("accessToken", accessToken);

      // 이미 가입된 사용자면 메인 페이지로 보냄

      if (type === "login") {
        try {
          LoginInit(accessToken);
        } catch (error) {
          if (error instanceof Error) {
            alert(error.message);
          } else {
            alert("로그인에 실패했습니다. 다시 시도해주세요.");
          }
        }
      }
      // 회원가입 필요한 사용자면 회원가입 페이지로
      else {
        localStorage.setItem("registerToken", accessToken); // 가입용 토큰 로컬 스토리지에 저장
        router.replace("/signup/profile/setting");
      }
    } else {
      alert("회원가입에 실패하였습니다.");
      router.replace("/signup");
    }
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
