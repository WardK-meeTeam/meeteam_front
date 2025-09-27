import { Suspense } from "react";
import ProjectFilterBar from "./components/ProjectFilterBar";
import ProjectSortBar from "./components/ProjectSortBar";
import ProjectListContainer from "./components/ProjectListContainer";
import ProjectLoading from "./components/ProjectLoading";
import { ProjectSearchParams } from "@/types/projectInfo";
import { projectCategoryOptions, recruitmentOptions, platformOptions, bigCategoryOptions, sortOptions } from "@/constants/projectOptions";
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
      <h1 className="mb-11 text-4xl font-extrabold">프로젝트</h1>
      <ProjectFilterBar 
        projectCategoryOptions={projectCategoryOptions}
        recruitmentOptions={recruitmentOptions}
        platformOptions={platformOptions}
        bigCategoryOptions={bigCategoryOptions}
      />
      <ProjectSortBar sortOptions={sortOptions} />
      <Suspense key={JSON.stringify(validatedParams)} fallback={<ProjectLoading />}>
        <ProjectListContainer searchParams={validatedParams} limit={20} />
      </Suspense>
    </main>
  );
}