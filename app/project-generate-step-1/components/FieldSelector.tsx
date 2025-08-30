"use client";
import Selectable from "@/components/Selectable";
import { useEffect, useState } from "react";

const options = [
  { Major: "기획", Sub: ["기획 굿", "기획 굿2"] },
  { Major: "디자인", Sub: ["디자인 굿", "디자인 굿2"] },
  { Major: "프론트엔드", Sub: ["프엔 굿", "프엔 굿2"] },
  { Major: "백엔드", Sub: ["백엔 굿", "백엔 굿2"] },
  { Major: "기타", Sub: ["기타 굿", "기타 굿2"] },
];

export default function FieldSelector({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (str: string | null) => void;
}) {
  // value로 받아온 "대분류/소뷴류" 형태를 쪼개서 구조분해할당으로 받아옴
  const [majorFromProp, subFromProp] = value ? value.split("/") : [null, null];

  const [selectedMajor, setSelectedMajor] = useState<string | null>(
    majorFromProp,
  );

  // 외부에서 받아오는 value가 바뀌면 계속 동기화 해줌
  useEffect(() => {
    const [newMajorFromProp] = value ? value.split("/") : [null, null];
    setSelectedMajor(newMajorFromProp);
  }, [value]);

  const majors = options.map((item) => item.Major);
  const subs = selectedMajor
    ? (options.find((item) => item.Major === selectedMajor)?.Sub ?? null)
    : null;

  function handleMajorChange(newMajor: string) {
    setSelectedMajor(newMajor);
  }

  function handleSubChange(newSub: string) {
    if (selectedMajor) {
      onChange(selectedMajor + "/" + newSub);
    }
  }

  return (
    <div className="w-full flex flex-1 flex-row gap-2">
      <Selectable
        options={majors}
        value={selectedMajor}
        onChangeOption={handleMajorChange}
      />
      <Selectable
        options={subs}
        disabled={!selectedMajor}
        value={subFromProp}
        onChangeOption={handleSubChange}
      />
    </div>
  );
}
