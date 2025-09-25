"use client";
import { getUserProfile } from "@/api/user";
import { UserProfile } from "@/types/userProfile";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  user: UserProfile | null; // <- 유저 프로필이 null이면 로그인 안된 상태
  setUser: (user: UserProfile | null) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 이 Provider를 만든 이유 ? -> User 정보 유무를 통해서 로그인 상태를 통합적으로 관리함
export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // localStorage는 브라우저에만 존재하는데, useEffect 자체가 클라이언트에서만 실행되니까 localStorage를 useEffect안에 넣으면 됨
  useEffect(() => {
    // 3번의 확인을 헤야함
    // 1. 로컬 스토리지에 accessToken이 존재하는지
    // 2. 해당 accessToken의 유효기간이 만료되지 않았는지
    // 3. refresh 토큰이 만료되지 않았는지

    const checkUserData = async () => {
      // 먼저 액세스 토큰이 있으면 그 토큰 기반으로 유저 데이터를 다시 불러옴
      try {
        const userData = await getUserProfile();
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        setUser(null);
        console.log("액세스 토큰으로 유저정보 조회 실패", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserData();
  }, []);

  const logout = () => {
    // 로그아웃 시 유저 데이터 삭제 및 메인 페이지 리다이렉트

    // !! 여기 나중에 로그아웃 API 파고, 그거 호출하는 방식으로 변경해야함!!
    localStorage.removeItem("accessToken");
    setUser(null);
    router.push("/");
  };

  const value = { user, setUser, logout, isLoading };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth 훅은 AuthProvider 내부에서만 사용되어야 합니다!");
  }

  return context;
}
