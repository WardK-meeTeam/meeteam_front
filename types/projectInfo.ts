export interface Member {
  memberId: number;
  name: string;
  imageUrl: string;
  creator: boolean;
}

export interface ProjectInfoItem {
  name: string;
  description: string;
  likeCount: number;
  platformCategory: string;
  projectCategory: string;
  imageUrl: string | null;
  startDate: string;
}

export interface RecruitStatus {
  bigCategory: string;
  subCategory: string;
  recruitmentCount: number;
  currentCount: number;
  closed: boolean;
}

export interface ProjectRecruitInfoItem {
  offlineRequired: boolean;
  endDate: string;
  skills: string[];
  recruitments: RecruitStatus[];
}
