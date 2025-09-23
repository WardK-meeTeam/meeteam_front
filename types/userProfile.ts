export interface Category {
  bigCategory: string;
  smallCategory: string;
}

export interface Project {
  localDate: string;
  title: string;
  status: string;
  projectId: number;
  imageUrl: string | null;
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
  // 프로필 이미지는 없을때 아래 둘다 null로 전달받음
  profileImageName: string | null;
  profileImageUrl: string | null;
}
