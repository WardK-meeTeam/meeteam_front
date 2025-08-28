import { create } from "zustand";

export interface recruitFieldItem {
  field: string;
  numOfPeople: number;
}

export interface ProjectGenerateState {
  projectName: string;
  projectCategories: string[];
  platform: string[];
  projectImage: string | null;
  mustOffline: "필수" | "선택";
  myField: string;
  recruitField: recruitFieldItem[];
  projectDeadline: string;
  projectDescription: string;

  setProjectName: (pn: string) => void;
  setProjectCategories: (pc: string[]) => void;
  setPlatform: (p: string[]) => void;
  setProjectImage: (pi: string) => void;
  setMustOffline: (o: "필수" | "선택") => void;
  setMyField: (mf: string) => void;
  setRecruitField: (rf: recruitFieldItem[]) => void;
  setProjectDeadline: (pd: string) => void;
  setProjectDescription: (pd: string) => void;
  reset: () => void;
}

export const useProjectGenerateStore = create<ProjectGenerateState>((set) => ({
  projectName: "",
  projectCategories: [],
  platform: [],
  projectImage: null,
  mustOffline: "필수",
  myField: "",
  recruitField: [],
  projectDeadline: "",
  projectDescription: "",

  // set 함수 모음
  setProjectName: (pn) => set({ projectName: pn }),
  setProjectCategories: (pc) => set({ projectCategories: pc }),
  setPlatform: (p) => set({ platform: p }),
  setProjectImage: (pi) => set({ projectImage: pi }),
  setMustOffline: (o) => set({ mustOffline: o }),
  setMyField: (mf) => set({ myField: mf }),
  setRecruitField: (rf) => set({ recruitField: rf }),
  setProjectDeadline: (pd) => set({ projectDeadline: pd }),
  setProjectDescription: (pd) => set({ projectDescription: pd }),

  //reset
  reset: () =>
    set({
      projectName: "",
      projectCategories: [],
      platform: [],
      projectImage: null,
      mustOffline: "필수",
      myField: "",
      recruitField: [],
      projectDeadline: "",
      projectDescription: "",
    }),
}));
