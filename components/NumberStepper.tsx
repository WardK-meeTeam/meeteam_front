"use client";

import { useState } from "react";

export default function NumberStepper({
  title,
  min,
  max,
  warningMessage,
  value,
  onChange,
}: {
  title: string;
  min: number;
  max: number;
  warningMessage: string;
  value: number;
  onChange: (num: number) => void;
}) {
  const [overNumber, setOverNumber] = useState(false);

  function isValid(value: number) {
    return value >= min && value <= max;
  }

  function handleClickPlusButton(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    // + 버튼 이벤트 핸들러
    if (value < max) {
      onChange(value + 1);
      setOverNumber(false);
    } else {
      setOverNumber(true);
    }
  }
  function handleClickMinusButton(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    // - 버튼 이벤트 핸들러
    if (value > min) {
      onChange(value - 1);
      setOverNumber(false);
    } else {
      setOverNumber(true);
    }
  }

  function handleInputNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const num = parseInt(value);
    if (!isNaN(num) && isValid(num)) {
      onChange(num);
    }
    // 백스페이스로 값 지웠을 때 NaN이 되는 것을 방지해서 min으로 만듦
    else if (value === "") onChange(min);
    // 숫자가 min과 max 사이가 아닐 때 경고 메세지 띄워주기 -> 한 번 뜨면 안 사자리게 해놨음
    else setOverNumber(true);
  }
  return (
    <div className="flex flex-col gap-4">
      <b>{title}</b>
      <div className="flex items-center border-collapse">
        <button
          type="button"
          onClick={handleClickMinusButton}
          className="w-[40px] h-[40px] box-border border border-mtm-light-gray border-r-0 flex justify-center items-center cursor-pointer"
        >
          -
        </button>
        <input
          value={value}
          onChange={handleInputNumberChange}
          className="w-[40px] h-[40px] box-border border border-mtm-main-blue text-center outline-0 bg-mtm-light-blue"
        />
        <button
          onClick={handleClickPlusButton}
          className="w-[40px] h-[40px] box-border border border-mtm-light-gray border-l-0 flex justify-center items-center cursor-pointer"
        >
          +
        </button>
      </div>
      <span
        className={`text-[12px] text-mtm-main-blue ${overNumber ? "" : "hidden"}`}
      >
        {warningMessage}
      </span>
    </div>
  );
}
