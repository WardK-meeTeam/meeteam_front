"use client";
import { authFetch } from "@/api/authFetch";
import { getUserProfile } from "@/api/user";
import { UserProfile } from "@/types/userProfile";
import Cookies from "js-cookie";
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
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserData = async () => {
      // 먼저 쿠키에 액세스 토큰이 있는지 확인
      const accessToken = Cookies.get("accessToken");
      
      if (!accessToken) {
        // 토큰이 없으면 로그인하지 않은 상태
        setUser(null);
        setIsLoading(false);
        return;
      }

      // 토큰이 있으면 유저 데이터를 불러옴
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

  const logout = async () => {
    // 로그아웃 시 유저 데이터 삭제 및 메인 페이지 리다이렉트

    // !! 여기 나중에 로그아웃 API 파고, 그거 호출하는 방식으로 변경해야함!!
    // 현재 refreshToken 삭제 불가
    try {
      const response = await authFetch('/api/auth/api/auth/logout', {
        method: "POST"
      });

      if (!response.ok) {
        throw new Error("로그아웃 실패");
      }

      Cookies.remove("accessToken");
      setUser(null);
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
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
