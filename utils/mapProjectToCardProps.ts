import { ProjectListItem } from "@/types/projectInfo";
import { CardProps } from "@/components/Card";
import type { ProjectInfoItem } from "@/types/projectInfo";


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

type AnyProject = ProjectListItem | ProjectInfoItem;

const isListItem = (p: AnyProject): p is ProjectListItem =>
  (p as ProjectListItem).projectId !== undefined &&
  (p as ProjectListItem).projectName !== undefined;

export const mapAnyProjectToCardProps = (p: AnyProject): CardProps => {
  if (isListItem(p)) {
    return mapProjectToCardProps(p);
  }

  const info = p as ProjectInfoItem;

  return {
    projectId:        (info as any).projectId ?? -1,              
    category:         (info as any).projectCategory ?? "ETC",
    tool:             ((info as any).techStack?.[0]) ?? "기타",
    teamName:         info.name ?? "",
    skills:           ((info as any).techStack ?? []) as string[],
    title:            info.name ?? "",
    leader:           (info as any).creatorName ?? "",
    projectImageUrl:  (info as any).projectImageUrl ?? info.imageUrl ?? "",
    projectMembers:   (info as any).projectMembers ?? [],
    currentCount:     (info as any).currentCount ?? 0,
    recruitmentCount: (info as any).recruitmentCount ?? 0,
    startDate:        info.startDate ?? "",
    endDate:          (info as any).endDate ?? "",
  };
};