"use client";
import Cookies from "js-cookie";

import { loginWithEmail } from "@/api/auth";
import { getUserProfile } from "@/api/user";
import Input from "@/components/Input";
import MainButton from "@/components/MainButton";
import SocialSignInButton from "@/components/SocialSignInButton";
import { useAuth } from "@/context/AuthContext";
import { UserProfile } from "@/types/userProfile";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Page() {
  const router = useRouter();
  const { setUser } = useAuth();

  const [loginFormData, setLoginFormData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const handleClickSignUp = (type: "google" | "github") => {
    window.location.href = `${API}/oauth2/authorization/${type}`;
  };

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
      // 1단계는 로그인 API 호출
      const { accessToken } = await loginWithEmail(loginFormData);

      // 쿠키에 저장
      Cookies.set("accessToken", accessToken, {
        expires: 1, // 1일
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });

      // 2단계는 유저정보 가져오기
      //로그인이 정상적으로 되었다면 유저정보 가져오는 API 호출
      const user: UserProfile = await getUserProfile();

      if (user) {
        setUser(user);
        router.push("/");
      } else {
        throw new Error("사용자 정보를 가져오는 데 실패했습니다.");
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <div className="w-[340px] m-auto box-border justify-start items-center flex flex-col flex-1 gap-8 mt-20">
      <Link href={"/"}>
        <h1 className="text-2xl font-bold text-mtm-main-blue">meeTeam</h1>
      </Link>
      <div className="flex flex-col gap-3 justify-start items-center w-full">
        <SocialSignInButton
          platform="google"
          text="Google로 로그인하기"
          onClick={() => handleClickSignUp("google")}
        />
        <SocialSignInButton
          platform="github"
          text="Github로 로그인하기"
          onClick={() => handleClickSignUp("github")}
        />
      </div>
      <span className="box-border flex flex-row justify-center items-center w-full">
        <div className="flex-1 h-px bg-mtm-light-gray" />
        <span className="px-4 text-xs">or</span>
        <div className="flex-1 h-px bg-mtm-light-gray" />
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
      <div className="mt-10">
        아직 meeTeam 계정이 없으신가요?
        <Link
          href={"/signup/profile/setting?type=email"}
          className="cursor-pointer text-mtm-main-blue"
        >
          {" "}
          가입하기
        </Link>
      </div>
    </div>
  );
}
