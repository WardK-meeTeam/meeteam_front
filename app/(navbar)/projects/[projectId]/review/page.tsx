import Modal from "@/components/Modal";
import ProjectReviewContainer from "./components/ProejctReviewContainer";

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  return (
    <Modal intercepting={true}>
      <ProjectReviewContainer projectId={projectId} />
    </Modal>
  );
}