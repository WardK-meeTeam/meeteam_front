import ManageClient from "./ManageClient";

export default async function Page({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  return <ManageClient projectId={projectId} />;
}
