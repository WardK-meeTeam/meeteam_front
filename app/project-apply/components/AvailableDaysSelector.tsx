"use client";
import ToggleButton from "@/components/ToggleButton";
import { useEffect, useState } from "react";

// 지원분야랑 투자 가능 요일 Toggle Button 사용법은 동일한데, 여기서는 Record 안쓰고 배열 2개 매핑하는 걸로함
// 요일 개수는 변하지 않으니까 배열로 해도 될 것 같다는 생각..

function AvailableDaysSelector({
  value,
  onChange,
}: {
  value: string[];
  onChange: (day: string[]) => void;
}) {
  const days = ["월", "화", "수", "목", "금", "토", "일"]; // 요일 담는 배열

  const [selectedDay, setSelectedDay] = useState<string[]>([]); // true인 요일만 필터링 -> data 보낼 용도
  // console.log("현재 선택된 요일 : ", selectedDay);

  // useEffect(() => {
  //   setSelectedDay(day.filter((_, idx) => daySelection[idx] === true));
  // }, [daySelection]);

  function handleClickButton(day: string) {
    if (value.includes(day)) {
      // 클릭했는데, 이미 선택이 되어있음
      const newDays = value.filter((item) => item !== day);
      onChange(newDays);
    } else {
      // 새로 추가
      const newDays = [...value, day];
      onChange(newDays);
    }
  }
  return (
    <div className="flex flex-col gap-2.5 w-full">
      <b>주당 투자 가능 요일</b>
      <div className="flex justify-start gap-3 items-center w-full">
        {days.map((day) => (
          <ToggleButton
            key={day}
            content={day}
            isDay={true}
            isSelected={value.includes(day)}
            onClick={() => handleClickButton(day)}
          />
        ))}
      </div>
    </div>
  );
}

export default AvailableDaysSelector;
