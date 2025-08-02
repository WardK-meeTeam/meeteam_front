"use client";
import ToggleButton from "@/components/ToggleButton";
import { useEffect, useState } from "react";

function ApplyFieldSelector() {
  const [selectedPart, setSelectedPart] = useState<string[]>([]);
  const partList = ["프론트", "백", "디자인", "기획", "마케팅"];
  const [parts, setParts] = useState<Record<string, boolean>>(
    Object.fromEntries(partList.map((p) => [p, false]))
  );
  // Object.fromEntries = 배열을 객체화 시켜줌
  // partList에 있는 문자열들을 map을 통해서 객체의 Key로 넣고, Value는 false로 초기화함
  // 따라서 useState로 선언한 parts는 {"프론트" : false,"백" : false ....} 이런 형태로 초기화 됨

  function handleClickPartButton(part: string) {
    setParts((prev) => ({ ...prev, [part]: !prev[part] }));
  }

  useEffect(() => {
    setSelectedPart(Object.keys(parts).filter((part) => parts[part]));
  }, [parts]); // part : true인 애들만 뽑아서 selected에 넣음 -> 전체를 다시 넣는거라 성능 최적화 고려하면 나중에 로직 다시 짜야하긴 할듯

  console.log("현재 선택된 파트들 : ", selectedPart);

  return (
    <div className="flex flex-col gap-4">
      <b>지원 분야</b>
      <div className="grid grid-cols-3 w-[350px] gap-4">
        {Object.keys(parts).map((part) => (
          <ToggleButton
            key={part}
            content={part}
            width={101}
            height={41}
            isSelected={parts[part]}
            onClick={() => handleClickPartButton(part)}
          />
        ))}
      </div>
    </div>
  );
}

export default ApplyFieldSelector;
