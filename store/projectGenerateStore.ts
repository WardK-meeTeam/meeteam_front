import { create } from "zustand";

export interface recruitFieldItem {
  id: number;
  field: string | null;
  numOfPeople: number;
}

export interface ProjectGenerateState {
  projectName: string;
  projectCategories: string;
  platform: string;
  projectImage: string | null;
  mustOffline: "필수" | "선택";
  myField: string | null;
  recruitField: recruitFieldItem[];
  skills: string[];
  projectDeadline: string | null;
  projectDescription: string;

  setProjectName: (pn: string) => void;
  setProjectCategories: (pc: string) => void;
  setPlatform: (p: string) => void;
  setProjectImage: (pi: string) => void;
  setMustOffline: (o: "필수" | "선택") => void;
  setMyField: (mf: string | null) => void;
  setRecruitField: (rf: recruitFieldItem[]) => void;
  setSkills: (sk: string[]) => void;
  setProjectDeadline: (pd: string | null) => void;
  setProjectDescription: (pd: string) => void;
  reset: () => void;
}

export const useProjectGenerateStore = create<ProjectGenerateState>((set) => ({
  projectName: "",
  projectCategories: "",
  platform: "",
  projectImage: null,
  mustOffline: "필수",
  myField: "",
  recruitField: [{ id: 0, field: null, numOfPeople: 1 }],
  skills: [],
  projectDeadline: null,
  projectDescription: "",

  // set 함수 모음
  setProjectName: (pn) => set({ projectName: pn }),
  setProjectCategories: (pc) => set({ projectCategories: pc }),
  setPlatform: (p) => set({ platform: p }),
  setProjectImage: (pi) => set({ projectImage: pi }),
  setMustOffline: (o) => set({ mustOffline: o }),
  setMyField: (mf) => set({ myField: mf }),
  setRecruitField: (rf) => set({ recruitField: rf }),
  setSkills: (sk) => set({ skills: sk }),
  setProjectDeadline: (pd) => set({ projectDeadline: pd }),
  setProjectDescription: (pd) => set({ projectDescription: pd }),

  //reset
  reset: () =>
    set({
      projectName: "",
      projectCategories: "",
      platform: "",
      projectImage: null,
      mustOffline: "필수",
      myField: "",
      recruitField: [{ id: 0, field: null, numOfPeople: 1 }],
      skills: [],
      projectDeadline: null,
      projectDescription: "",
    }),
}));
