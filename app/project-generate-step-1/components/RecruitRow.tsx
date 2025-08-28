"use client";
import { useEffect, useState } from "react";
import FieldSelector from "./FieldSelector";
import { recruitFieldItem } from "@/store/projectGenerateStore";

// 일단 최소인원 1명, 최대인원 9명으로 해둠

export default function RecruitRow({
  onFieldChange,
}: {
  onFieldChange: (payload: recruitFieldItem) => void;
}) {
  const [field, setField] = useState<string | null>(null);
  const [number, setNumber] = useState<number>(1);
  const onClickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.value === "+" && number < 9) {
      setNumber((prev) => prev + 1);
    } else if (e.currentTarget.value === "-" && number > 1) {
      setNumber((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (field !== null) {
      onFieldChange({
        field: field,
        numOfPeople: number,
      });
    }
  }, [field, number]);
  return (
    <div className="w-full flex flex-row flex-1 gap-2 items-center">
      <FieldSelector onChangeOptions={setField} />
      <div className="flex items-center">
        <button
          className="w-[40px] h-[40px] box-border flex justify-center items-center cursor-pointer"
          onClick={onClickButton}
          value="-"
        >
          -
        </button>
        <span>{number}</span>
        <button
          className="w-[40px] h-[40px] box-border border-l-0 flex justify-center items-center cursor-pointer"
          onClick={onClickButton}
          value="+"
        >
          +
        </button>
      </div>
    </div>
  );
}
