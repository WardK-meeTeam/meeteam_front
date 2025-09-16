"use client";

import SocialSignInButton from "./components/SocialSignInButton";
import MainButton from "@/components/MainButton";
import { useRouter } from "next/navigation";

export default function CreateAccount() {
  const router = useRouter();

  const API = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleClickSignUp = (type: "google" | "github") => {
    window.location.href = `${API}/oauth2/authorization/${type}`;
  };

  return (
    <div className="w-[340px] m-auto box-border justify-start items-center flex flex-col flex-1 gap-8">
      <h1 className="text-2xl font-bold text-mtm-main-blue">meeTeam</h1>
      <div className="flex flex-col w-full justify-start items-center gap-3 ">
        <SocialSignInButton
          platform="google"
          onClick={() => handleClickSignUp("google")}
        />
        <SocialSignInButton
          platform="github"
          text="Github로 시작하기"
          onClick={() => handleClickSignUp("github")}
        />
      </div>

      <span className="flex flex-row justify-center items-center w-full box-border">
        <div className="bg-mtm-light-gray h-px flex-1" />
        <span className="px-4 text-xs">or</span>
        <div className="bg-mtm-light-gray h-px flex-1" />
      </span>

      <MainButton
        buttonName="이메일로 시작하기"
        disabled={false}
        onClick={() => router.push("/setting-after-signup?type=email")}
      />
    </div>
  );
}
