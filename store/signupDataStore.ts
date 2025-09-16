import { create } from "zustand";
import { recruitFieldItem } from "./projectGenerateStore";

export interface userFieldItem extends Pick<recruitFieldItem, "id" | "field"> {}

export interface SignUpState {
  email?: string;
  password?: string;
  confirmPassword?: string;
  userName: string;
  birthDate: string | null;
  gender: "MALE" | "FEMALE";
  field: userFieldItem[];
  skills: string[];
  profileImg: string | null;
  introduction: string;

  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (password: string) => void;
  setUserName: (un: string) => void;
  setBirthDate: (bd: string | null) => void;
  setGender: (g: "MALE" | "FEMALE") => void;
  setField: (f: userFieldItem[]) => void;
  setSkills: (sk: string[]) => void;
  setProfileImg: (img: string | null) => void;
  setIntroduction: (intro: string) => void;
  reset: () => void;
}

export const useSignUpStore = create<SignUpState>((set) => ({
  email: "",
  password: "",
  confirmPassword: "",
  userName: "",
  birthDate: "",
  gender: "MALE",
  field: [{ id: 0, field: null }],
  skills: [],
  profileImg: null,
  introduction: "",

  // setter 함수 모음
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
  setUserName: (un) => set({ userName: un }),
  setBirthDate: (bd) => set({ birthDate: bd }),
  setGender: (g) => set({ gender: g }),
  setField: (f) => set({ field: f }),
  setSkills: (sk) => set({ skills: sk }),
  setProfileImg: (img) => set({ profileImg: img }),
  setIntroduction: (intro) => set({ introduction: intro }),

  // reset 함수
  reset: () =>
    set({
      email: "",
      password: "",
      confirmPassword: "",
      userName: "",
      birthDate: "",
      gender: "MALE",
      field: [{ id: 0, field: null }],
      skills: [],
      profileImg: null,
      introduction: "",
    }),
}));
