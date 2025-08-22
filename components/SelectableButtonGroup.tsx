"use client";
import ToggleButton from "@/components/ToggleButton";
import { useEffect, useState } from "react";

export default function SelectableButtonGroup({
  title,
  subtitle,
  optionList,
}: {
  title: string;
  subtitle?: string;
  optionList: string[];
}) {
  const [selectedOption, setSelectedOption] = useState<string[]>([]);
  const [options, setOptions] = useState<Record<string, boolean>>(
    Object.fromEntries(optionList.map((opt) => [opt, false])),
  );
  // Object.fromEntries = 배열을 객체화 시켜줌
  // partList에 있는 문자열들을 map을 통해서 객체의 Key로 넣고, Value는 false로 초기화함
  // 따라서 useState로 선언한 options는 {"프론트" : false,"백" : false ....} 이런 형태로 초기화 됨

  function handleClickPartButton(part: string) {
    setOptions((prev) => ({ ...prev, [part]: !prev[part] }));
  }

  useEffect(() => {
    setSelectedOption(Object.keys(options).filter((part) => options[part]));
  }, [options]); // part : true인 애들만 뽑아서 selected에 넣음 -> 전체를 다시 넣는거라 성능 최적화 고려하면 나중에 로직 다시 짜야하긴 할듯

  // console.log("현재 선택된 옵션들 : ", selectedOption);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-2 items-center">
        <b>{title}</b>
        <span className="text-red-500 text-xs">{subtitle ? subtitle : ""}</span>
      </div>
      <div className="flex flex-row flex-wrap w-full gap-3">
        {Object.keys(options).map((part) => (
          <ToggleButton
            key={part}
            content={part}
            isSelected={options[part]}
            onClick={() => handleClickPartButton(part)}
          />
        ))}
      </div>
    </div>
  );
}
