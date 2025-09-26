import { ProjectSearchParams } from "@/types/projectInfo";
import ProjectList from "./ProjectList";
import { serverAuthFetch } from "@/api/serverAuthFetch";
import { buildQueryString } from "@/utils/buildQueryString";
import { validateSearchParams } from "@/utils/validateSearchParams";

const dummyCard = {
  category: "Healthcare",
  tool: "Figma",
  teamName: "BreathMate",
  date: "2025.06.01",
  tools: ["Ai", "Figma", "Ps"],
  title: "스마트 호흡 트레커를 통한 천식 모니터링 앱",
  leader: "김도윤",
  progress: 70,
  teamSize: 9,
  userImg: [
    "/images/userImg1.png",
    "/images/userImg2.png",
    "/images/userImg3.png",
    "/images/userImg4.png",
    "/images/userImg5.png",
    "/images/userImg6.png",
    "/images/userImg7.png",
  ],
  deadDate: "2025.10.06",
  passionLevel: 99,
};

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
    sort: ['createdAt,desc']
  };
  
  const queryString = buildQueryString(queryParams);
  
  // GET 메서드로 변경하고 쿼리 파라미터 사용
  const response = await serverAuthFetch(`/api/projects/condition${queryString}`, {
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
      last={projects.last || false}
      searchParams={searchParams}
    />
  );
}
