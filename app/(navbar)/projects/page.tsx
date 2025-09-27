import ProjectFilterBar from "./components/ProjectFilterBar";
import ProjectSortBar from "./components/ProjectSortBar";
import ProjectList from "./components/ProjectList";
import { ProjectSearchParams } from "@/types/projectInfo";
import { projectCategoryOptions, recruitmentOptions, platformOptions, bigCategoryOptions, sortOptions } from "@/constants/projectOptions";
import { validateSearchParams } from "@/utils/validateSearchParams";

async function fetchInitialProjects(searchParams: ProjectSearchParams) {
  console.log("api 요청", searchParams);
  return [];
}

export default async function ProjectsPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> 
}) {
  // 처음 프로젝트 데이터 요청
  const params = await searchParams;
  const validatedParams = validateSearchParams(params as ProjectSearchParams);
  const projects = await fetchInitialProjects(validatedParams);
  
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
      <ProjectList projects={projects}/>
    </main>
  );
}