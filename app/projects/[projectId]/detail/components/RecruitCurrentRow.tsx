import { RecruitStatus } from "../ProjectPageClient";
import ApplyButton from "./ApplyButton";

export default function RecruitCurrentRow({
  bigCategory,
  subCategory,
  recruitmentCount,
  currentCount,
  closed,
}: RecruitStatus) {
  return (
    <div className="flex flex-row gap-8 justify-around items-center min-w-[460px]">
      <span className="flex-1">{`${bigCategory}(${subCategory})`}</span>
      <span>
        {currentCount}/{recruitmentCount}
      </span>
      <ApplyButton disabled={closed} />
    </div>
  );
}
