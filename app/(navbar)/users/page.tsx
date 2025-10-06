import { Suspense } from "react";
import UserFilterBar from "./components/UserFilterBar";
import { ProjectSearchParams } from "@/types/projectInfo";
import { bigCategoryOptions } from "@/constants/projectOptions";
import { validateSearchParams } from "@/utils/validateSearchParams";
import UserLoading from "./components/UserListLoading";
import UserListContainer from "./components/UserListContainer";

export default async function ProjectsPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> 
}) {
  const params = await searchParams;
  
  return (
    <main className="mx-auto mt-10 w-11/12 max-w-7xl min-w-5xl">
      <h1 className="mb-11 text-4xl font-extrabold">팀원 찾기</h1>
      <UserFilterBar 
        bigCategoryOptions={bigCategoryOptions}
      />
      <Suspense key={JSON.stringify(params)} fallback={<UserLoading />}>
        <UserListContainer searchParams={params} limit={20} />
      </Suspense>
    </main>
  );
}