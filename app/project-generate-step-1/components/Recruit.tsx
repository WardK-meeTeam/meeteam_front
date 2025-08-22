"use client";
import { useEffect, useState } from "react";
import RecruitRow from "./RecruitRow";

export default function Recruit() {
  const [count, setCount] = useState<number[]>([1]);

  const onClickButton = (e) => {
    const value = e.target.value;
    if (value === "추가") {
      setCount((prev) => [...prev, prev.length + 1]);
    } else if (value === "삭제" && count.length != 1) {
      setCount((prev) => prev.slice(0, prev.length - 1));
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <b>분야</b>
      {count.map((_, idx) => (
        <RecruitRow key={`프로젝트생성-모집분야-${idx}`} />
      ))}
      <span className="text-end">
        <button
          className="py-2 px-4 cursor-pointer bg-[#F8F8F8] rounded-xl border border-[#9D9D9D]"
          onClick={onClickButton}
          value="삭제"
        >
          삭제
        </button>
        <button
          className="py-2 px-4 cursor-pointer bg-mtm-light-blue rounded-xl border border-mtm-main-blue"
          onClick={onClickButton}
          value="추가"
        >
          추가
        </button>
      </span>
    </div>
  );
}
