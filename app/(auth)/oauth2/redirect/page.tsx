"use client";

// 구글, 깃헙 인증 성공 후 리다이렉트 처리할 페이지
import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function RedirectLogic() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get("token");
    const memberId = searchParams.get("memberId");
    const type = searchParams.get("type");
    // type은 login or register

    if (accessToken && memberId && type) {
      localStorage.setItem("accessToken", accessToken);

      // 이미 가입된 사용자면 메인 페이지로 보냄
      if (type === "login") {
        router.push("/");
      }
      // 회원가입 필요한 사용자면 회원가입 페이지로
      else {
        router.replace("/setting-after-signup");
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
