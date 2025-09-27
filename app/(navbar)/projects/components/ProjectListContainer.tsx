import { ProjectSearchParams } from "@/types/projectInfo";
import ProjectList from "./ProjectList";
import { authFetch } from "@/api/authFetch";
import { buildQueryString } from "@/utils/buildQueryString";
import { validateSearchParams } from "@/utils/validateSearchParams";

// 초기 프로젝트 데이터 fetch
const fetchInitialProjects = async (searchParams: ProjectSearchParams, limit: number) => {
  // 검색 파라미터 유효성 검사 및 기본값 설정
  const validatedParams = validateSearchParams({
    ...searchParams,
    page: searchParams.page || 0,
    size: limit
  });
  
  // API 명세에 따라 쿼리 파라미터 생성
  const queryParams = {
    projectCategory: validatedParams.projectCategory,
    recruitment: validatedParams.recruitment, 
    platformCategory: validatedParams.platformCategory,
    bigCategory: validatedParams.bigCategory,
    techStack: validatedParams.techStack,
    page: validatedParams.page || 0,
    size: limit,
    sort: [validatedParams.sort]
  };
  
  const queryString = buildQueryString(queryParams);
  
  // GET 메서드로 변경하고 쿼리 파라미터 사용
  const response = await authFetch(`/api/projects/condition${queryString}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();
  return data;
}

export default async function ProjectListContainer({ 
  searchParams,
  limit,
}: { 
  searchParams: ProjectSearchParams,
  limit: number,
}) {
  const projects = await fetchInitialProjects(searchParams, limit);
  
  return (
    <ProjectList 
      initialProjects={projects.content || []} 
      limit={limit}
      totalElements={projects.totalElements}
      last={projects.last || false}
      searchParams={searchParams}
    />
  );
}
