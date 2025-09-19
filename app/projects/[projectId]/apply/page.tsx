import ProjectApplyClient from "./ProjectApplyClient";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  return (
    <Suspense>
      <ProjectApplyClient projectId={projectId} />
    </Suspense>
  );
}
