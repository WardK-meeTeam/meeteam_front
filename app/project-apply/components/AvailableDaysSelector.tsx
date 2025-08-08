"use client";
import ToggleButton from "@/components/ToggleButton";
import { useEffect, useState } from "react";

// 지원분야랑 투자 가능 요일 Toggle Button 사용법은 동일한데, 여기서는 Record 안쓰고 배열 2개 매핑하는 걸로함
// 요일 개수는 변하지 않으니까 배열로 해도 될 것 같다는 생각..

function AvailableDaysSelector() {
  const day = ["월", "화", "수", "목", "금", "토", "일"]; // 요일 담는 배열
  const [daySelection, setDaySelection] = useState<boolean[]>(
    new Array(7).fill(false)
  ); // day 배열과 매핑될 배열, daySelection[0] = false의 의미는 월요일이 현재 선택되지 않았음을 의미

  const [selectedDay, setSelectedDay] = useState<string[]>([]); // true인 요일만 필터링 -> data 보낼 용도
  // console.log("현재 선택된 요일 : ", selectedDay);

  useEffect(() => {
    setSelectedDay(day.filter((_, idx) => daySelection[idx] === true));
  }, [daySelection]);

  function handleClickButton(idx: number) {
    setDaySelection((prev) => {
      const updated = [...prev];
      updated[idx] = !updated[idx];
      return updated;
    });
  }
  return (
    <div className="flex flex-col gap-2.5">
      <b>주당 투자 가능 요일</b>
      <div className="flex justify-between items-center ">
        {day.map((day, idx) => (
          <ToggleButton
            key={day}
            content={day}
            width={45}
            height={41}
            isSelected={daySelection[idx]}
            onClick={() => handleClickButton(idx)}
          />
        ))}
      </div>
    </div>
  );
}

export default AvailableDaysSelector;
