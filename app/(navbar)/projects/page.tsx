import { Suspense } from "react";
import ProjectFilterBar from "./components/ProjectFilterBar";
import ProjectListContainer from "./components/ProjectListContainer";
import ProjectListLoading from "./components/ProjectListLoading";
import { ProjectSearchParams } from "@/types/projectInfo";
import { projectCategoryOptions, recruitmentOptions, platformOptions, bigCategoryOptions } from "@/constants/projectOptions";
import { validateSearchParams } from "@/utils/validateSearchParams";

export default async function ProjectsPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> 
}) {
  const params = await searchParams;
  const validatedParams = validateSearchParams(params as ProjectSearchParams);

  return (
    <main className="mx-auto mt-10 w-11/12 max-w-7xl min-w-5xl">
      <h1 className="mb-11 text-4xl font-extrabold">프로젝트 찾기</h1>
      <ProjectFilterBar 
        projectCategoryOptions={projectCategoryOptions}
        recruitmentOptions={recruitmentOptions}
        platformOptions={platformOptions}
        bigCategoryOptions={bigCategoryOptions}
      />
      <Suspense key={JSON.stringify(validatedParams)} fallback={<ProjectListLoading />}>
        <ProjectListContainer searchParams={params} limit={20} />
      </Suspense>
    </main>
  );
}