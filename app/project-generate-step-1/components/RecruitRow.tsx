"use client";
import Selectable from "@/components/Selectable";
import { useState } from "react";

const options = ["iOS", "Android", "Web"];

export default function RecruitRow() {
  const [number, setNumber] = useState<number>(1);
  const onClickButton = (e) => {
    if (e.target.value === "+") {
      setNumber((prev) => prev + 1);
    } else if (e.target.value === "-") {
      setNumber((prev) => prev - 1);
    }
  };
  return (
    <div className="w-full flex flex-row flex-1 gap-2 items-center">
      <Selectable options={options} />
      <Selectable options={options} />
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
