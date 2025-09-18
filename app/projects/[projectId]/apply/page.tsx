import ProjectApplyClient from "./ProjectApplyClient";

export default async function Page({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  return (
    <div>
      <ProjectApplyClient projectId={projectId} />
    </div>
  );
}
