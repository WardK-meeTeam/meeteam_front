"use client";
``;
import Image from "next/image";
import ArrowIcon from "@/public/images/right_arrow_icon.svg";
import Link from "next/link";

export default function ModifyButton() {
  return (
    <Link
      href={"/users/edit"}
      className="text-mtm-purple flex gap-2 cursor-pointer text-[14px]"
    >
      정보 수정하기
      <Image src={ArrowIcon} alt="수정하기" width={8} height={12} />
    </Link>
  );
}
