import { RecruitStatus } from "@/types/projectInfo";
import ApplyButton from "./ApplyButton";

interface RecruitCurrentRowProps extends RecruitStatus {
  projectId: string;
}

export default function RecruitCurrentRow({
  bigCategory,
  subCategory,
  recruitmentCount,
  currentCount,
  closed,
  projectId,
}: RecruitCurrentRowProps) {
  return (
    <div className="flex flex-row gap-8 justify-around items-center min-w-[460px]">
      <span className="flex-1">{`${bigCategory}(${subCategory})`}</span>
      <span>
        {currentCount}/{recruitmentCount}
      </span>
      <ApplyButton
        disabled={closed}
        projectId={projectId}
        subCategory={subCategory}
      />
    </div>
  );
}
