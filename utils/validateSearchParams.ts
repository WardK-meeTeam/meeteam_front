import { ProjectCategory, Recruitment, PlatformCategory, BigCategory } from "@/types/projectInfo";
import { Option, projectCategoryOptions, recruitmentOptions, platformOptions, bigCategoryOptions } from "@/constants/projectOptions";

// value값이 options에 있는 값인지 확인
function validateValue<T extends string>(options: Option[], value: string | undefined): T | undefined {
  return value && options.map(opt => opt.value).includes(value) ? (value as T) : undefined;
}

export function validateSearchParams(params: any): any {
  return {
    projectCategory: validateValue<ProjectCategory>(projectCategoryOptions, params.projectCategory),
    recruitment: validateValue<Recruitment>(recruitmentOptions, params.recruitment),
    platformCategory: validateValue<PlatformCategory>(platformOptions, params.platformCategory),
    bigCategory: validateValue<BigCategory>(bigCategoryOptions, params.bigCategory),
    techStack: params.techStack,
    page: params.page,
    size: params.size,
    sort: params.sort || ['createdAt,desc'] // 기본값: 생성일 오름차순 배열
  };
}
