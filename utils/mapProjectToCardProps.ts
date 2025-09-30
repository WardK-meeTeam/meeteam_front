import { ProjectListItem } from "@/types/projectInfo";
import { CardProps } from "@/components/Card";

// API 응답 데이터를 Card 컴포넌트 props로 변환하는 함수
export const mapProjectToCardProps = (project: ProjectListItem) : CardProps => ({
  category: project.projectCategory,
  tool: project.projectSkills[0] || "기타", // 뭐지
  teamName: project.projectName,
  date: project.localDate,
  tools: project.projectSkills, // 맞겠지?
  title: project.projectName,
  leader: project.creatorName,

  // 임시 데이터
  progress: 70,
  teamSize: 5,
  userImg: [
    "/images/userImg1.png",
    "/images/userImg2.png", 
    "/images/userImg3.png",
  ],
  deadDate: "2025.12.31",
  passionLevel: 85,
});