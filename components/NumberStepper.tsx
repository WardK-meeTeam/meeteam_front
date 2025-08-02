"use client";

import { useState } from "react";

export default function NumberStepper({
  title,
  initValue,
  min,
  max,
  warningMessage,
}: {
  title: string;
  initValue: number;
  min: number;
  max: number;
  warningMessage: string;
}) {
  const [number, setNumber] = useState(initValue);
  const [overNumber, setOverNumber] = useState(false); //

  function handleClickPlusButton() {
    // + 버튼 이벤트 핸들러
    if (number < max) {
      setNumber((prev) => (prev += 1));
    } else {
      setOverNumber(true);
    }
  }
  function handleClickMinusButton() {
    // - 버튼 이벤트 핸들러
    if (number > min) {
      setNumber((prev) => (prev -= 1));
    } else {
      setOverNumber(true);
    }
  }

  function handleInputNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (parseInt(value) <= max && parseInt(value) >= min) {
      setNumber(parseInt(value));
    }
    // 백스페이스로 값 지웠을 때 NaN이 되는 것을 방지해서 0으로 만듦
    else if (value === "") setNumber(0);
    // 숫자가 min과 max 사이가 아닐 때 경고 메세지 띄워주기 -> 한 번 뜨면 안 사자리게 해놨음
    else setOverNumber(true);
  }
  return (
    <div className="flex flex-col gap-4">
      <b>{title}</b>
      <div className="flex items-center border-collapse">
        <button
          onClick={handleClickMinusButton}
          className="w-[40px] h-[40px] box-border border border-[#D9D9D9] border-r-0 flex justify-center items-center cursor-pointer"
        >
          -
        </button>
        <input
          value={number}
          onChange={handleInputNumberChange}
          className="w-[40px] h-[40px] box-border border border-[#6BB4FF] text-center outline-0 bg-[#EDF6FF]"
        />
        <button
          onClick={handleClickPlusButton}
          className="w-[40px] h-[40px] box-border border border-[#D9D9D9] border-l-0 flex justify-center items-center cursor-pointer"
        >
          +
        </button>
      </div>
      <span
        className={`text-[12px] text-[#6BB4FF] ${overNumber ? "" : "hidden"}`}
      >
        {warningMessage}
      </span>
    </div>
  );
}
