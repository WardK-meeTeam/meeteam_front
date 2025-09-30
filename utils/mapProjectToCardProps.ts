import { ProjectListItem } from "@/types/projectInfo";
import { CardProps } from "@/components/Card";

// API 응답 데이터를 Card 컴포넌트 props로 변환하는 함수
export const mapProjectToCardProps = (project: ProjectListItem) : CardProps => ({
  projectId: project.projectId,
  category: project.projectCategory,
  tool: project.projectSkills[0] || "기타",
  teamName: project.projectName,
  skills: project.projectSkills,
  title: project.projectName,
  leader: project.creatorName,
  projectImageUrl: project.projectImageUrl,
  projectMembers: project.projectMembers,
  currentCount: project.currentCount,
  recruitmentCount: project.recruitmentCount,
  startDate: project.startDate,
  endDate: project.endDate,
});