"use client";
import { useState } from "react";

export default function TextArea({ maxSize }: { maxSize: number }) {
  const [inputText, setInputText] = useState("");
  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    if (value.length <= maxSize) {
      // maxLength 속성 안쓰고 직접 제어 글자수가 maxSize 이하일 때만 입력되도록
      setInputText(e.target.value);
    }
  }
  return (
    <div>
      <textarea
        value={inputText}
        onChange={handleInputChange}
        className="w-full h-[215px] border border-mtm-light-gray p-5 rounded-xl overflow-x-hidden overflow-y-auto resize-none focus:outline-mtm-main-blue"
      />
      <div className="flex gap-1 text-[12px] justify-end">
        <span>{inputText.length}</span>
        <span className="text-mtm-text-gray">/ {maxSize}자</span>
      </div>
    </div>
  );
}
