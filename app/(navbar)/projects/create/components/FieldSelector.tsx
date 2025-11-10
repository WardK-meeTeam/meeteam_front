"use client";
import Selectable from "@/components/Selectable";
import { useEffect, useState } from "react";

const options = [
  { Major: "기획", Sub: ["프로덕트 매니저/오너"] },
  {
    Major: "디자인",
    Sub: ["그래픽디자인", "UI/UX디자인", "모션 디자인", "BX/브랜드 디자인"],
  },
  {
    Major: "프론트엔드",
    Sub: ["웹프론트엔드", "iOS", "안드로이드", "크로스플랫폼"],
  },
  { Major: "백엔드", Sub: ["웹서버", "AI", "DBA/빅데이터/DS"] },
  { Major: "기타", Sub: ["기타"] },
];

export default function FieldSelector({
  value,
  onChange,
  errors = [],
}: {
  value: string | null;
  onChange: (str: string | null) => void;
  errors?: string[];
}) {
  // value로 받아온 "대분류-소뷴류" 형태를 쪼개서 구조분해할당으로 받아옴
  const [majorFromProp, subFromProp] = value ? value.split("-") : [null, null];

  const [selectedMajor, setSelectedMajor] = useState<string | null>(
    majorFromProp,
  );

  // 외부에서 받아오는 value가 바뀌면 계속 동기화 해줌
  useEffect(() => {
    const [newMajorFromProp] = value ? value.split("-") : [null, null];
    if (value === "") return;
    setSelectedMajor(newMajorFromProp);
  }, [value]);

  const majors = options.map((item) => item.Major);
  const subs = selectedMajor
    ? (options.find((item) => item.Major === selectedMajor)?.Sub ?? null)
    : null;

  function handleMajorChange(newMajor: string) {
    setSelectedMajor(newMajor);
    onChange("");
  }

  function handleSubChange(newSub: string) {
    if (selectedMajor) {
      onChange(selectedMajor + "-" + newSub);
    }
  }

  return (
    <div className="flex flex-col flex-1 gap-1 w-full">
      <div className="flex flex-row flex-1 gap-2 w-full">
        <Selectable
          options={majors}
          value={selectedMajor}
          onChangeOption={handleMajorChange}
        />
        <Selectable
          options={subs ?? []}
          disabled={!selectedMajor}
          value={subFromProp}
          onChangeOption={handleSubChange}
        />
      </div>
      {errors.map((error, index) => (
        <span key={index} className="text-sm font-medium text-red-500">
          {error}
        </span>
      ))}
    </div>
  );
}
