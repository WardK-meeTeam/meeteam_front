import { create } from "zustand";
import { recruitFieldItem } from "./projectGenerateStore";

export interface userFieldItem extends Pick<recruitFieldItem, "id" | "field"> {}

export interface SignUpState {
  userName: string;
  birthDate: string | null;
  gender: "여성" | "남성";
  field: userFieldItem[];
  skills: string[];
  profileImg: string | null;
  introduction: string;

  setUserName: (un: string) => void;
  setBirthDate: (bd: string | null) => void;
  setGender: (g: "여성" | "남성") => void;
  setField: (f: userFieldItem[]) => void;
  setSkills: (sk: string[]) => void;
  setProfileImg: (img: string | null) => void;
  setIntroduction: (intro: string) => void;
  reset: () => void;
}

export const useSignUpStore = create<SignUpState>((set) => ({
  userName: "",
  birthDate: "",
  gender: "남성",
  field: [{ id: 0, field: null }],
  skills: [],
  profileImg: null,
  introduction: "",

  // setter 함수 모음
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
      userName: "",
      birthDate: "",
      gender: "남성",
      field: [{ id: 0, field: null }],
      skills: [],
      profileImg: null,
      introduction: "",
    }),
}));
