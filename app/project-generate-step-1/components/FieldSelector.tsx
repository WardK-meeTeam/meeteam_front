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
  onChangeOptions,
}: {
  onChangeOptions: (str: string) => void;
}) {
  const [selectedMajor, setSelectedMajor] = useState<string | null>(null);
  const [subs, setSubs] = useState<string[] | null>(null);
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const majors = options.map((item) => item["Major"]);

  useEffect(() => {
    if (selectedMajor) {
      const newSubs = options.filter((item) => item["Major"] === selectedMajor);
      setSubs(newSubs[0]["Sub"]);
    }

    if (selectedMajor !== null && selectedSub !== null) {
      const result = selectedMajor + "/" + selectedSub;
      onChangeOptions(result);
    }
  }, [selectedMajor]);

  useEffect(() => {
    if (selectedMajor !== null && selectedSub !== null) {
      const result = selectedMajor + "/" + selectedSub;
      onChangeOptions(result);
    }
  }, [selectedSub]);

  return (
    <div className="w-full flex flex-1 flex-row gap-2">
      <Selectable
        options={majors}
        value={selectedMajor}
        onChangeOption={setSelectedMajor}
      />
      <Selectable
        options={subs}
        disabled={selectedMajor === null}
        value={selectedSub}
        onChangeOption={setSelectedSub}
      />
    </div>
  );
}
