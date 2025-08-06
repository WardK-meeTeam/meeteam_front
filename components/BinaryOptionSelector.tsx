"use client";

import ToggleButton from "@/components/ToggleButton";
import { useState } from "react";

export default function BinaryOptionSelector({
  title,
  option1,
  option2,
}: {
  title: string;
  option1: string;
  option2: string;
}) {
  const [selectOption1, setSelectOption1] = useState(true);
  const nowSelceted = selectOption1 ? option1 : option2; // 현재 선택된 옵션
  function handleClickOption1() {
    // 가능 버튼 클릭
    if (!selectOption1) {
      // 현재 상태가 불가능일 때만 재렌더링
      setSelectOption1((prev) => !prev);
    }
  }
  function handleClickOption2() {
    // 불가능 버튼 클릭
    if (selectOption1) {
      // 현재 상태가 가능일 때만 재렌더링
      setSelectOption1((prev) => !prev);
    }
  }
  console.log(nowSelceted);
  return (
    <div className="flex flex-col gap-4">
      <b>{title}</b>
      <div className="flex gap-3">
        <ToggleButton
          content={option1}
          width={90}
          height={41}
          isSelected={selectOption1}
          onClick={handleClickOption1}
        />
        <ToggleButton
          content={option2}
          width={90}
          height={41}
          isSelected={!selectOption1}
          onClick={handleClickOption2}
        />
      </div>
    </div>
  );
}
