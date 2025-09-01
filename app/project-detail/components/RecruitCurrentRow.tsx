import ApplyButton from "./ApplyButton";

interface RecruitCurrentRowProps {
  field: string;
  recruited: number;
  capacity: number;
}

export default function RecruitCurrentRow({
  field,
  recruited,
  capacity,
}: RecruitCurrentRowProps) {
  return (
    <div className="flex flex-row gap-4 justify-around items-center min-w-[430px]">
      <span className="flex-1">{field}</span>
      <span>
        {recruited}/{capacity}
      </span>
      <ApplyButton disabled={recruited === capacity} />
    </div>
  );
}
