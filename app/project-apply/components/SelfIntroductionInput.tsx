"use client";

import { useState } from "react";

export default function SelfIntroductionInput() {
  const [inputText, setInputText] = useState("");
  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    if (value.length <= 800) {
      // maxLength 속성 안쓰고 직접 제어 글자수가 800 이하일 때만 입력되도록
      setInputText(e.target.value);
    }
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <b>지원 사유 및 자기소개</b>
        <span className="text-[#6BB4FF]">
          설명글은 800자 이내로 작성해주세요!
        </span>
      </div>
      <div>
        <textarea
          value={inputText}
          onChange={handleInputChange}
          className="w-full h-[215px] border border-[#D9D9D9] p-2 rounded-xl overflow-x-hidden overflow-y-auto resize-none focus:outline-[#6BB4FF]"
        />
        <div className="flex gap-1 text-[12px] justify-end">
          <span>{inputText.length}</span>
          <span className="text-[#9C9C9C]">/ 800자</span>
        </div>
      </div>
    </div>
  );
}
