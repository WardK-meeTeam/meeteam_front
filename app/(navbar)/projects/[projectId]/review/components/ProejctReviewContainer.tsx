import { getProjectDetail } from "@/api/projectDetail";
import { Member } from "@/types/projectInfo";
import ProjectReviewForm from "./ProjectReviewForm";

export default async function ProjectReviewContainer({ projectId }: { projectId: string }) {
  const { success, data } = await getProjectDetail(projectId);
  
  if (!success) {
    return <div>프로젝트 정보를 불러오는데 실패했습니다.</div>
  }

  return (
    <div className="flex flex-col gap-12">
      <h1 className="text-4xl font-extrabold">프로젝트 리뷰 작성하기</h1>
      <div>
        <div className="mb-2">
          <span className="inline-block w-28 font-bold">프로젝트 명</span>
          <span className="font-medium">{data.name}</span>
        </div>
        <div>
          <span className="inline-block w-28 font-bold">프로젝트 리더</span>
          <span className="font-medium">{data.projectMembers.filter((member: Member) => member.creator === true)[0].name}</span>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-bold">프로필 정보</h2>
        <div className="mb-2">
          <span className="inline-block w-32 font-bold">이름</span>
          <span className="font-medium">{data.projectMembers.filter((member: Member) => member.creator === true)[0].name}</span>
        </div>
        <div className="mb-2">
          <span className="inline-block w-32 font-bold">직책</span>
          <span className="font-medium">UI/UX 디자이너</span> {/* TODO: 직책 데이터 받아오기 */}
        </div>
        <div className="mb-2">
          <span className="inline-block w-32 font-bold">함께한 총 시간</span>
          <span className="font-medium">총 80시간 18분</span> {/* TODO: 함께한 총 시간 데이터 받아오기 */}
        </div>
      </div>
      <ProjectReviewForm projectId={projectId} />
    </div>
  );
}