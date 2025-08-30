"use client";
import FieldSelector from "./FieldSelector";
import { recruitFieldItem } from "@/store/projectGenerateStore";

export default function RecruitRow({
  value,
  onChange,
}: {
  value: recruitFieldItem;
  onChange: (payload: recruitFieldItem) => void;
}) {
  const handleFieldChange = (newField: string | null) => {
    onChange({ ...value, field: newField });
  };

  const handleNumberChange = (newNumber: number) => {
    if (newNumber >= 1 && newNumber <= 9) {
      onChange({ ...value, numOfPeople: newNumber });
    }
  };

  const onClickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const operation = e.currentTarget.value;
    if (operation === "+") {
      handleNumberChange(value.numOfPeople + 1);
    } else if (operation === "-") {
      handleNumberChange(value.numOfPeople - 1);
    }
  };

  return (
    <div className="w-full flex flex-row flex-1 gap-2 items-center">
      <FieldSelector value={value.field} onChange={handleFieldChange} />
      <div className="flex items-center">
        <button
          type="button"
          className="w-[40px] h-[40px] box-border flex justify-center items-center cursor-pointer"
          onClick={onClickButton}
          value="-"
          disabled={value.numOfPeople <= 1}
        >
          -
        </button>
        <span className="text-mtm-main-blue">{value.numOfPeople}</span>
        <button
          type="button"
          className="w-[40px] h-[40px] box-border border-l-0 flex justify-center items-center cursor-pointer"
          onClick={onClickButton}
          value="+"
          disabled={value.numOfPeople >= 9}
        >
          +
        </button>
      </div>
    </div>
  );
}
