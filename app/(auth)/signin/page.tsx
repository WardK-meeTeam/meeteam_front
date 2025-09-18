"use client";

import Input from "@/components/Input";
import MainButton from "@/components/MainButton";
import SocialSignInButton from "@/components/SocialSignInButton";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Page() {
  const router = useRouter();

  const [loginFormData, setLoginFormData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name as "email" | "password";
    const value = e.target.value;
    setLoginFormData((prev) => ({ ...prev, [key]: value }));
  };

  // 로그인 버튼 클릭 시
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loginFormData.email === "" || loginFormData.password === "") return;

    try {
      const response = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginFormData),
      });

      // 성공/실패 분기
      if (response.ok) {
        const data = await response.json();
        const userId = data.result.memberId;
        if (!userId) console.log("userId 조회 실패");
        const receivedAcessToken = response.headers
          .get("Authorization")
          ?.slice(7); // Bearer 토큰 이런식으로 와서 앞에 7자리 자르고 액세스 토큰만 저장

        // 혹시 몰라서 액세스 토큰 못받았을 때도 토스트 메세지 띄워줌
        if (!receivedAcessToken) throw "토큰 저장에 실패했습니다.";

        // 토큰 받아왔으면 localStorage에 넣어주자
        localStorage.setItem("accessToken", receivedAcessToken);

        //내 정보 불러오가
        await useUserStore.getState().fetchUser(userId.toString());

        router.push("/"); // 토큰 저장했으면 메인화면 이동까지
      } else {
        const errorData = await response.json();
        throw errorData.message;
      }
    } catch (error) {
      alert(`${error}`);
    }
  };

  return (
    <div className="w-[340px] m-auto box-border justify-start items-center flex flex-col flex-1 gap-8">
      <h1 className="text-2xl font-bold text-mtm-main-blue">meeTeam</h1>
      <div className="flex flex-col w-full justify-start items-center gap-3 ">
        <SocialSignInButton
          platform="google"
          text="Google로 로그인하기"
          onClick={() => console.log("미완성")}
        />
        <SocialSignInButton
          platform="github"
          text="Github로 로그인하기"
          onClick={() => console.log("미완성")}
        />
      </div>

      <span className="flex flex-row justify-center items-center w-full box-border">
        <div className="bg-mtm-light-gray h-px flex-1" />
        <span className="px-4 text-xs">or</span>
        <div className="bg-mtm-light-gray h-px flex-1" />
      </span>
      <form className="flex flex-col gap-3 w-full" onSubmit={handleLogin}>
        <div className="flex flex-col">
          <span className="text-md">Email</span>
          <Input
            name="email"
            type="email"
            value={loginFormData.email}
            onChange={handleChangeInput}
            required={true}
          />
        </div>

        <div className="flex flex-col">
          <span className="text-md">비밀번호</span>
          <Input
            name="password"
            type="password"
            value={loginFormData.password}
            onChange={handleChangeInput}
            required={true}
          />
        </div>
        <MainButton buttonName={"로그인"} type="submit" disabled={false} />
      </form>
    </div>
  );
}
