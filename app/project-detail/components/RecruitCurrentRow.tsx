import ApplyButton from "./ApplyButton";

export default function RecruitCurrentRow() {
  return (
    <div className="flex flex-row gap-4 justify-around items-center">
      <span>백엔드</span>
      <span>1/2</span>
      <ApplyButton />
    </div>
  );
}
