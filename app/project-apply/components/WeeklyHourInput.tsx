"use client";

import { useState } from "react";

function WeeklyHourInput() {
  const [hour, setHour] = useState(1); // 0 아래로는 안내려가게 , 7 * 24 = 168 0<= hour <= 168
  const [overHour, setOverHour] = useState(false); //

  function handleClickPlusButton() {
    // + 버튼 이벤트 핸들러
    if (hour < 168) {
      setHour((prev) => (prev += 1));
    }
  }
  function handleClickMinusButton() {
    // - 버튼 이벤트 핸들러
    if (hour > 0) {
      setHour((prev) => (prev -= 1));
    }
  }

  function handleInputHourChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (parseInt(value) <= 168 && parseInt(value) >= 0) {
      // 1주는 168시간이니 168 최대
      setHour(parseInt(value));
    }
    // 백스페이스로 값 지웠을 때 NaN이 되는 것을 방지해서 0으로 만듦
    else if (value === "") setHour(0);
    // 숫자가 0과 168 사이가 아닐 때 경고 메세지 띄워주기 -> 한 번 뜨면 안 사자리게 해놨음
    else setOverHour(true);
  }
  return (
    <div className="flex flex-col gap-4">
      <b>주당 투자 가능 시간</b>
      <div className="flex items-center border-collapse">
        <button
          onClick={handleClickMinusButton}
          className="w-[40px] h-[40px] box-border border border-[#D9D9D9] border-r-0 flex justify-center items-center cursor-pointer"
        >
          -
        </button>
        <input
          value={hour}
          onChange={handleInputHourChange}
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
        className={`text-[12px] text-[#6BB4FF] ${overHour ? "" : "hidden"}`}
      >
        시간은 0시간 이상 168시간 이하로 입력해주세요!
      </span>
    </div>
  );
}

export default WeeklyHourInput;
