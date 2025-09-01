import MemberList from "../components/MemberList";
import ProjectInfo from "../components/ProjectInfo";
import ProjectRecruitInfo from "../components/ProjectRecruitInfo";

export default async function Page({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  return (
    <div className="flex flex-row gap-16 max-w-7xl mx-auto pb-24">
      <aside className="flex flex-col gap-3 w-[194px] flex-1">
        <span className="text-[14px]">프로젝트를 함께할 사람들</span>
        <MemberList />
      </aside>
      <main className="max-w-[830px] flex flex-col gap-16">
        <ProjectInfo />
        <hr className="text-mtm-light-gray" />
        <ProjectRecruitInfo />
      </main>
    </div>
  );
}
