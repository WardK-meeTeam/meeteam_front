import { UserProfile } from "@/types/userProfile";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { fetchUser as fetchUserApi } from "@/api/user";

export interface UserState {
  user: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
  setUser: (user: UserProfile) => void;
  reset: () => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isLoading: false,
        error: null,

        fetchUser: async () => {
          set({ isLoading: true, error: null }, false, "fetchUser/pending");
          try {
            const data = await fetchUserApi();
            const userData = data.result;
            set(
              { user: userData, isLoading: false },
              false,
              "fetchUser/fulfilled",
            );
          } catch (error) {
            set(
              { error: (error as Error).message, isLoading: false },
              false,
              "fetchUser/rejected",
            );
          }
        },

        setUser: (user) => set({ user }, false, "setUser"),

        reset: () =>
          set({ user: null, isLoading: false, error: null }, false, "reset"),
      }),
      {
        name: "user-storage", // localStorage에 저장될 키 이름
      },
    ),
    {
      name: "UserStore", // DevTools에 표시될 스토어 이름
    },
  ),
);
