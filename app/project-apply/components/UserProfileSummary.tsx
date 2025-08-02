"use client"; // onClick 하나때문에 일단 클라이언트 컴포넌트로 만듦
import { userProfile } from "@/types/userProfile";
import modifyButton from "@/public/images/right_arrow_icon.svg";
import Image from "next/image";

export default function UserProfileSummary({
  name = "이름",
  age = 0,
  sex = "none",
  email = "none",
  techStack = [],
}: userProfile) {
  return (
    <div className="flex flex-col gap-5">
      <span className="flex justify-between items-center ">
        <b>기본 정보</b>
        <span
          onClick={() => alert("기본정보 수정")}
          className="text-[#AD5FFF] flex gap-2 cursor-pointer text-[14px]"
        >
          수정하기
          <Image src={modifyButton} alt="수정하기" width={8} height={12} />
        </span>
      </span>
      <hr className="border-4 border-[#F8F8F8]" />
      <div className="flex flex-col gap-6">
        <span>
          <b className="mr-3">이름</b> {name}
        </span>
        <span>
          <b className="mr-3">나이</b> {age}세 <b className="ml-4 mr-3">성별</b>{" "}
          {sex}
        </span>
        <span>
          <b className="mr-3">이메일</b> {email}
        </span>
        <span>
          {/* 순회 하면서 기술스택 나열 -> 마지막 요소만 쉼표 없이 렌더링 */}
          <b className="mr-3">기술스택</b>
          {techStack.map((tech, idx) => {
            if (idx !== techStack.length - 1) return `${tech},`;
            else return `${tech}`;
          })}
        </span>
      </div>
    </div>
  );
}
