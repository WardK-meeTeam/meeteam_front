interface Category {
  bigCategory: string;
  smallCategory: string;
}

interface Project {
  localDate: string;
  title: string;
  status: string;
}

// 아직 리뷰 타입 존재 X

export interface UserProfile {
  name: string;
  age: number;
  gender: "MALE" | "FEMALE";
  email: string;
  categories: Category[];
  skills: { skill: string }[];
  isParticipating: boolean;
  projectCount: number;
  reviewCount: number;
  introduce: string;
  reviewList?: [];
  projectList: Project[];
}
