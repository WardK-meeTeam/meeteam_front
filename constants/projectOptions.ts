export interface Option {
  value: string;
  label: string;
}

export const projectCategoryOptions: Option[] = [
  { value: "", label: "모든 카테고리" },
  { value: "ENVIRONMENT", label: "친환경🍀" },
  { value: "PET", label: "반려동물🐱" },
  { value: "HEALTHCARE", label: "헬스케어💪" },
  { value: "EDUCATION", label: "교육/학습📚" },
  { value: "AI_TECH", label: "AI/테크💻" },
  { value: "FASHION_BEAUTY", label: "패션/뷰티💄" },
  { value: "FINANCE_PRODUCTIVITY", label: "금융/생산성⚒️" },
  { value: "ETC", label: "기타" },
];

export const recruitmentOptions: Option[] = [
  { value: "", label: "모든 모집상태" },
  { value: "RECRUITING", label: "모집중" },
  { value: "CLOSED", label: "모집종료" },
];

export const platformOptions: Option[] = [
  { value: "", label: "전체" },
  { value: "IOS", label: "iOS" },
  { value: "ANDROID", label: "Android" },
  { value: "WEB", label: "Web" },
];

export const bigCategoryOptions: Option[] = [
  { value: "", label: "전체" },
  { value: "백엔드", label: "백엔드" },
  { value: "프론트엔드", label: "프론트엔드" },
  { value: "디자인", label: "디자인" },
  { value: "기획", label: "기획" },
  { value: "기타", label: "기타" },
];

export const sortOptions: Option[] = [
  { value: "createdAt,desc", label: "최신순" },
  { value: "createdAt,asc", label: "오래된순" },
];