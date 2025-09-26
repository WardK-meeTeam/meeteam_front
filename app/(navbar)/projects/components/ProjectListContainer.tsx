import { ProjectSearchParams } from "@/types/projectInfo";
import ProjectList from "./ProjectList";

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
async function fetchInitialProjects(searchParams: ProjectSearchParams, limit: number) {
  await new Promise(resolve => setTimeout(resolve, 3000));
  console.log("api 요청", searchParams);
  return Array(limit).fill(dummyCard);
}

export default async function ProjectListContainer({ 
  searchParams,
  limit,
}: { 
  searchParams: ProjectSearchParams,
  limit: number,
}) {
  const projects = await fetchInitialProjects(searchParams, limit);
  return <ProjectList initialProjects={projects} limit={limit} />;
}
