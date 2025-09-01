"use client";
import HeartFill from "@/public/images/heart-fill.svg";
import HeartNonFill from "@/public/images/heart-non-fill.svg";
import Image from "next/image";
import ProjectCategoryIcon from "./ProjectCategoryIcon";
import mockBanner from "@/public/images/mockBanner.png";
import { useState } from "react";

const title = "마감일 기준 자동 우선순위 정렬 ToDo 앱";
const categories = ["iOS", "생산성 / 금융"];
const description =
  "이 앱은 사용자가 등록한 할 일(To Do)을 마감일 기준으로 자동 정렬해주는 스마트한 일정 관리 도구입니다. 사용자는 작업 제목, 마감일, 중요도 등을 입력할 수 있으며, 앱은 이를 기반으로 우선순위를 자동 계산하여 정렬합니다. 마감일이 가까울수록, 중요도가 높을수록 상위에 노출되며, 남은 시간에 따라 색상 또는 아이콘으로 시각적 경고도 제공합니다. 또한, 완료 체크, 반복 일정 설정, 태그 분류, 간단한 통계 기능 등을 포함해 일상부터 프로젝트 관리까지 활용이 가능합니다. 직관적인 UI와 알림 기능으로 효율적인 시간 관리와 생산성 향상을 목표로 하며, 학생·직장인 모두를 위한 간단하지만 강력한 일정 관리 솔루션입니다.";
const like = 23;
export default function ProjectInfo() {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <div className="flex flex-col gap-10 w-full">
      <Image
        className="w-full rounded-xl"
        alt="프로젝트 이미지"
        src={mockBanner}
      />
      <div className="flex flex-col gap-6">
        <span className="text-4xl font-bold">{title}</span>
        <div className="flex flex-row gap-3">
          {categories.map((item) => (
            <ProjectCategoryIcon
              key={`detail-프로젝트id-${item}`}
              category={item}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-start items-start gap-3">
        <p className="w-full">{description}</p>
        <span className="text-mtm-text-gray text-xs">게시일 2025.08.03</span>
      </div>

      <span className="flex flex-row justify-end items-center gap-1">
        {like}
        <Image
          onClick={() => setIsLiked((prev) => !prev)}
          className="cursor-pointer"
          alt="하트 이미지"
          src={isLiked ? HeartFill : HeartNonFill}
          width={20}
          height={20}
        />
      </span>
    </div>
  );
}
