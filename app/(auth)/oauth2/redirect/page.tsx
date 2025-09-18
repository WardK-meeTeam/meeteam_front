"use client";

// 구글, 깃헙 인증 성공 후 리다이렉트 처리할 페이지
import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function RedirectLogic() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get("token");

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);

      // To-Do
      // 액세스 토큰 확인하고 이미 존재하는 사용자인지 확인해야함
      // 이미 존재하는 사용자면 "계정이 이미 존재합니다." 이런문구 띄우면서 로그인  + 메인페이지 리다이렉트 진행

      router.replace("/setting-after-signup");
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
