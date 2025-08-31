import ApplyButton from "./ApplyButton";
import RecruitCurrentRow from "./RecruitCurrentRow";

export default function ProjectRecruitInfo() {
  return (
    <div className="flex flex-col gap-10 max-w-[600px]">
      <span className="text-[26px] font-bold">프로젝트 모집 정보</span>
      <ApplyButton />
      <span className="font-bold">모집 분야</span>
      <table>
        <tr>
          <th className="font-bold">모집 현황</th>
        </tr>

        <RecruitCurrentRow />
      </table>

      <span className="font-bold">기술 스택</span>
      <span className="font-bold">오프라인 정기 모임 필수 여부</span>
      <span className="font-bold">프로젝트 마감 기한</span>
    </div>
  );
}
