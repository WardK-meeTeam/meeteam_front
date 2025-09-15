"use client";
import { useCallback } from "react";
import RecruitRow from "./RecruitRow";
import { recruitFieldItem } from "@/store/projectGenerateStore";
import { userFieldItem } from "@/store/signupDataStore";

interface RecruitProps {
  title: string;
  value: recruitFieldItem[] | userFieldItem[];
  onChange: (field: any) => void;
}

// onChange부분 파라미터 any로 받기 싫었는데.. 어떻게 해결해야할지 몰라서 일단 이렇게 둠
// 파라미터가 recruitFieldItem[] or userFieldItem[] 이렇게 들어오는데, 자꾸 프로젝트 생성페이지
// 파라미터 넘기는 부분에서 오류떠서 일단 any로 둘게요

export default function Recruit({ title, value, onChange }: RecruitProps) {
  const hasPeopleCount = value.some((v) => "numOfPeople" in v);

  const onClickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonValue = e.currentTarget.value;
    if (buttonValue === "추가") {
      const newId =
        value.length > 0 ? Math.max(...value.map((item) => item.id)) + 1 : 0;
      let newField: recruitFieldItem | userFieldItem;
      if (hasPeopleCount) newField = { id: newId, field: null, numOfPeople: 1 };
      else newField = { id: newId, field: null };
      onChange([...value, newField]);
    } else if (buttonValue === "삭제" && value.length > 1) {
      onChange(value.slice(0, -1));
    }
  };

  const handleRowChange = useCallback(
    (updatedRow: recruitFieldItem | userFieldItem) => {
      const newFields = value.map((row) =>
        row.id === updatedRow.id ? updatedRow : row,
      );
      onChange(newFields);
    },
    [value, onChange],
  );

  return (
    <div className="flex flex-col gap-4 w-full">
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
  );
}
