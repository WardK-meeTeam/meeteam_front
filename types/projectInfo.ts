export type ProjectCategory ="ENVIRONMENT" | "PET" | "HEALTHCARE" | "EDUCATION" | "AI_TECH" | "FASHION_BEAUTY" | "FINANCE_PRODUCTIVITY" | "ETC";
export type Recruitment = "RECRUITING" | "CLOSED";
export type PlatformCategory = "IOS" | "ANDROID" | "WEB";
export type BigCategory = "기획" | "디자인" | "프론트엔드" | "백엔드" | "기타";

export interface ProjectSearchParams {
  projectCategory?: ProjectCategory;
  recruitment?: Recruitment;
  platformCategory?: PlatformCategory;
  bigCategory?: BigCategory;
  sort?: 'desc' | 'asc';
}

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
