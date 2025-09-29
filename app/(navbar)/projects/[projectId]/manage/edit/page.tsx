import ProjectModifyClient from "./ProjectModifyClient";

export default async function Page({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  return <ProjectModifyClient projectId={projectId} />;
}
