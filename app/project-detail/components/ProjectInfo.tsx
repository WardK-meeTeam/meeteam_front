"use client";
import HeartFill from "@/public/images/heart-fill.svg";
import HeartNonFill from "@/public/images/heart-non-fill.svg";
import Image from "next/image";
import ProjectTag from "./ProjectTag";
import notFoundImg from "@/public/images/ProjectImgNotFound.png";
import { useState } from "react";
import { ProjectInfoItem } from "@/types/projectInfo";

interface ProjectInfoProps extends ProjectInfoItem {
  projectId: string;
}

export default function ProjectInfo({
  projectId,
  name,
  description,
  likeCount,
  platformCategory,
  projectCategory,
  imageUrl,
  startDate,
}: ProjectInfoProps) {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <div className="flex flex-col gap-12 w-full">
      <Image
        className="w-full h-auto rounded-xl"
        alt="프로젝트 이미지"
        src={imageUrl ?? notFoundImg}
        width={0}
        height={0}
        sizes="100vw"
      />
      <div className="flex flex-col gap-6">
        <span className="text-4xl font-bold">{name}</span>
        <div className="flex flex-row gap-3">
          <ProjectTag
            key={`detail-${projectId}-Platform-${platformCategory}`}
            isPlatform={true}
            category={platformCategory}
          />

          <ProjectTag
            key={`detail-${projectId}-Category-${projectCategory}`}
            isPlatform={false}
            category={projectCategory}
          />
        </div>
      </div>
      <div className="flex flex-col justify-start items-start gap-3">
        <p className="w-full">{description}</p>
        <span className="text-mtm-text-gray text-xs">게시일 {startDate}</span>
      </div>

      <span className="flex flex-row justify-end items-center gap-1">
        {likeCount}
        <Image
          onClick={() => setIsLiked((prev) => !prev)}
          className="cursor-pointer transition-all duration-300 hover:scale-110 active:scale-125"
          alt="하트 이미지"
          src={isLiked ? HeartFill : HeartNonFill}
          width={20}
          height={20}
        />
      </span>
    </div>
  );
}
