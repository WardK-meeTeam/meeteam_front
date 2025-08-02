"use client";
import ToggleButton from "@/components/ToggleButton";
import { useState } from "react";

// 지원분야랑 투자 가능 요일 Toggle Button 사용법은 동일한데, 여기서는 Record 안쓰고 배열 2개 매핑하는 걸로함
// 요일 개수는 변하지 않으니까 배열로 해도 될 것 같다는 생각..

function AvailableDaysSelector() {
  const day = ["월", "화", "수", "목", "금", "토", "일"];
  // 7칸 짜리 배열로 각 요일별로 선택됐는지 안됐는지 확인함
  const [daySelected, setDaySelected] = useState<boolean[]>(
    new Array(7).fill(false)
  );
  // 클릭했을 때 각 요일 버튼 상태 바꾸는 함수 -> index로 접근함
  function handleClickButton(idx: number) {
    setDaySelected((prev) => {
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
            isSelected={daySelected[idx]}
            onClick={() => handleClickButton(idx)}
          />
        ))}
      </div>
    </div>
  );
}

export default AvailableDaysSelector;
