"use client";
import { useState } from "react";

export default function TextArea({
  maxSize,
  value,
  onChange,
}: {
  maxSize: number;
  value: string;
  onChange: (str: string) => void;
}) {
  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const text = e.target.value;
    if (text.length <= maxSize) {
      // maxLength 속성 안쓰고 직접 제어 글자수가 maxSize 이하일 때만 입력되도록
      onChange(text);
    }
  }
  return (
    <div>
      <textarea
        value={value}
        onChange={handleInputChange}
        className="w-full h-[215px] border border-mtm-light-gray p-5 rounded-xl overflow-x-hidden overflow-y-auto resize-none focus:outline-mtm-main-blue"
      />
      <div className="flex gap-1 text-[12px] justify-end">
        <span>{value.length}</span>
        <span className="text-mtm-text-gray">/ {maxSize}자</span>
      </div>
    </div>
  );
}
