"use client";

import ToggleButton from "@/components/ToggleButton";
import { useEffect, useState } from "react";

//제네릭으로 확장성 보장
// 해당 컴포넌트 사용할 때
// <BinaryOptionSelector<"필수" | "선택">  ~~~ />
// 이런식으로 제네릭에 어떤 옵션 쓸지 명시해줘야함
export default function BinaryOptionSelector<T extends string>({
  title,
  option1,
  option2,
  onClickOption,
}: {
  title: string;
  option1: T;
  option2: T;
  onClickOption?: (op: T) => void;
}) {
  const [selectFirstOption, setSelectFirstOption] = useState(true);
  function handleClickOption1() {
    // 가능 버튼 클릭
    if (!selectFirstOption) {
      // 현재 상태가 불가능일 때만 재렌더링
      setSelectFirstOption((prev) => !prev);
    }
  }
  function handleClickOption2() {
    // 불가능 버튼 클릭
    if (selectFirstOption) {
      // 현재 상태가 가능일 때만 재렌더링
      setSelectFirstOption((prev) => !prev);
    }
  }

  useEffect(() => {
    const selected = selectFirstOption ? option1 : option2; // 현재 선택된 옵션
    onClickOption?.(selected); // 옵셔널 체이닝 문법
  }, [[selectFirstOption]]);
  return (
    <div className="flex flex-col gap-4">
      <b>{title}</b>
      <div className="flex gap-3">
        <ToggleButton
          content={option1}
          isSelected={selectFirstOption}
          onClick={handleClickOption1}
        />
        <ToggleButton
          content={option2}
          isSelected={!selectFirstOption}
          onClick={handleClickOption2}
        />
      </div>
    </div>
  );
}
