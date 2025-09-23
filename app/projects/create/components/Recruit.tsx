"use client";
import { useCallback } from "react";
import RecruitRow from "./RecruitRow";
import { recruitFieldItem } from "@/store/projectGenerateStore";
import { userFieldItem } from "@/store/signupDataStore";

interface RecruitProps<T extends recruitFieldItem | userFieldItem> {
  title: string;
  value: T[];
  onChange: (field: T[]) => void;
  errors?: string[];
}

export default function Recruit<T extends recruitFieldItem | userFieldItem>({
  title,
  value,
  onChange,
  errors,
}: RecruitProps<T>) {
  const hasPeopleCount = value.some((v) => "numOfPeople" in v);

  const onClickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonValue = e.currentTarget.value;
    if (buttonValue === "추가") {
      const newId =
        value.length > 0 ? Math.max(...value.map((item) => item.id)) + 1 : 0;
      let newField: T;
      if (hasPeopleCount) {
        newField = { id: newId, field: null, numOfPeople: 1 } as T;
      } else {
        newField = { id: newId, field: null } as T;
      }
      onChange([...value, newField]);
    } else if (buttonValue === "삭제" && value.length > 1) {
      onChange(value.slice(0, -1));
    }
  };

  const handleRowChange = useCallback(
    (updatedRow: recruitFieldItem | userFieldItem) => {
      const newFields = value.map((row) =>
        row.id === updatedRow.id ? (updatedRow as T) : row,
      );
      onChange(newFields);
    },
    [value, onChange],
  );

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex flex-col gap-4">
        {title !== "" ? <b>{title}</b> : ""}

        {value.map((item) => (
          <RecruitRow key={item.id} value={item} onChange={handleRowChange} />
        ))}
        <span className="flex flex-row gap-2 justify-end items-center">
          <button
            type="button"
            className="flex justify-center items-center py-2 px-4 cursor-pointer bg-[#F8F8F8] rounded-lg border border-[#9D9D9D] text-[14px]"
            onClick={onClickButton}
            value="삭제"
          >
            삭제
          </button>
          <button
            type="button"
            className="flex justify-center items-center py-2 px-4 cursor-pointer bg-mtm-light-blue rounded-lg border border-mtm-main-blue text-[14px]"
            onClick={onClickButton}
            value="추가"
          >
            추가
          </button>
        </span>
      </div>
      {errors && <span className="text-red-500 text-sm">{errors}</span>}
    </div>
  );
}
