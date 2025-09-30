"use client";

// 로그인 이후 쿠키에 액세스토큰 저장 + 유저 프로필 저장하는 훅
import { getUserProfile } from "@/api/user";
import { useAuth } from "@/context/AuthContext";
import { UserProfile } from "@/types/userProfile";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export function useAuthBootstrap() {
  const router = useRouter();
  const { setUser } = useAuth();

  const LoginInit = async (accessToken: string) => {
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
      alert("사용자 정보를 가져오는 데 실패했습니다.");
      router.push("/signup/profile/setting");
    }
  };

  return { LoginInit };
}
