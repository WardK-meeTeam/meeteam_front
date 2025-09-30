import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface ProjectManageHeaderProps {
  projectId: string;
  projectName: string;
  subPageName?: string;
}

export default function ProjectManageHeader({
  projectId,
  projectName,
  subPageName,
}: ProjectManageHeaderProps) {
  return (
    <h1 className="mb-11 flex items-center text-4xl font-extrabold">
      <span className="text-gray-500">프로젝트 관리</span>
      <ChevronRight className="mx-2 h-9 w-9 text-gray-300" />
      {subPageName ? (
        <>
          <span className="text-gray-500">{subPageName}</span>
          <ChevronRight className="mx-2 h-9 w-9 text-gray-300" />
        </>
      ) : null}
      <Link
        href={`/projects/${projectId}/detail`}
        className="hover:underline underline-offset-8 text-gray-800"
      >
        {projectName}
      </Link>
    </h1>
  );
}
