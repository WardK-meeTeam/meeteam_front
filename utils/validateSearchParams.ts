import { ProjectSearchParams, ProjectCategory, Recruitment, PlatformCategory, BigCategory } from "@/types/projectInfo";
import { Option, projectCategoryOptions, recruitmentOptions, platformOptions, bigCategoryOptions } from "@/constants/projectOption";

// value값이 options에 있는 값인지 확인
function validateValue<T extends string>(options: Option[], value: string | undefined): T | undefined {
  return value && options.map(opt => opt.value).includes(value) ? (value as T) : undefined;
}

export function validateSearchParams(params: ProjectSearchParams): ProjectSearchParams {
  return {
    projectCategory: validateValue<ProjectCategory>(projectCategoryOptions, params.projectCategory),
    recruitment: validateValue<Recruitment>(recruitmentOptions, params.recruitment),
    platformCategory: validateValue<PlatformCategory>(platformOptions, params.platformCategory),
    bigCategory: validateValue<BigCategory>(bigCategoryOptions, params.bigCategory),
    sort: ["desc", "asc"].includes(params.sort || "desc") ? params.sort : "desc"
  };
}
