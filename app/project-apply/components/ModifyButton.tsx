"use client";

import Image from "next/image";
import ArrowIcon from "@/public/images/right_arrow_icon.svg";

export default function ModifyButton() {
  return (
    <span
      onClick={() => alert("기본정보 수정 모달 띄우기")}
      className="text-[#AD5FFF] flex gap-2 cursor-pointer text-[14px]"
    >
      수정하기
      <Image src={ArrowIcon} alt="수정하기" width={8} height={12} />
    </span>
  );
}
