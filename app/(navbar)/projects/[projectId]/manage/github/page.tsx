import GithubClient from "./GithubClient";

export default async function Page({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  return <GithubClient projectId={projectId} />;
}
