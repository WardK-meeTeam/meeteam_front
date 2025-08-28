"use client";
import BinaryOptionSelector from "@/components/BinaryOptionSelector";
import SelectableButtonGroup from "@/components/SelectableButtonGroup";
import ImageSelector from "./components/ImageSelector";
import Recruit from "./components/Recruit";
import TechSearch from "./components/TechSearch";
import DateSelector from "@/components/DateSelector";
import MainButton from "@/components/MainButton";
import SubButton from "@/components/SubButton";
import { useRouter } from "next/navigation";
import Input from "./components/Input";
import { useEffect } from "react";
import { useProjectGenerateStore } from "@/store/projectGenerateStore";
import FieldSelector from "./components/FieldSelector";

const categories = [
  "친환경☘️",
  "반려동물🐱",
  "헬스케어💪",
  "교육/학습📚",
  "AI/테크💻",
  "패션/뷰티💄",
];
const platforms = ["iOS", "Android", "Web"];

export default function Page() {
  const router = useRouter();

  // 상태 꺼내오는 코드들
  const projectName = useProjectGenerateStore((state) => state.projectName);
  const projectCategories = useProjectGenerateStore(
    (state) => state.projectCategories,
  );
  const platform = useProjectGenerateStore((state) => state.platform);
  const projectImage = useProjectGenerateStore((state) => state.projectImage);
  const mustOffline = useProjectGenerateStore((state) => state.mustOffline);
  const myField = useProjectGenerateStore((state) => state.myField);
  const recruitField = useProjectGenerateStore((state) => state.recruitField);
  const projectDeadline = useProjectGenerateStore(
    (state) => state.projectDeadline,
  );
  const projectDescription = useProjectGenerateStore(
    (state) => state.projectDescription,
  );

  // setter 함수들
  const setProjectName = useProjectGenerateStore(
    (state) => state.setProjectName,
  );
  const setProjectCategories = useProjectGenerateStore(
    (state) => state.setProjectCategories,
  );
  const setPlatform = useProjectGenerateStore((state) => state.setPlatform);
  const setProjectImage = useProjectGenerateStore(
    (state) => state.setProjectImage,
  );
  const setMustOffline = useProjectGenerateStore(
    (state) => state.setMustOffline,
  );
  const setMyField = useProjectGenerateStore((state) => state.setMyField);
  const setRecruitField = useProjectGenerateStore(
    (state) => state.setRecruitField,
  );
  const setProjectDeadline = useProjectGenerateStore(
    (state) => state.setProjectDeadline,
  );
  const setProjectDescription = useProjectGenerateStore(
    (state) => state.setProjectDescription,
  );
  const reset = useProjectGenerateStore((state) => state.reset);

  function checkField() {}

  useEffect(() => {
    console.log(platform);
    console.log(projectImage);
    console.log(mustOffline);
  }, [platform, projectCategories, projectImage, mustOffline]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-[430px] m-auto justify-start flex flex-col flex-1 py-10 ">
        <b className="text-[26px] mb-10">프로젝트 등록</b>
        <div className="flex flex-col gap-16">
          <Input
            title="프로젝트 명"
            placeholder="프로젝트 이름을 입력해주세요"
            value={projectName}
            onChange={setProjectName}
          />
          <SelectableButtonGroup
            title={"프로젝트 카테고리"}
            subtitle="프로젝트 카테고리를 선택해주세요!"
            optionList={categories}
            onChangeOptions={setProjectCategories}
          />
          <SelectableButtonGroup
            title={"플랫폼"}
            optionList={platforms}
            onChangeOptions={setPlatform}
          />
          <ImageSelector value={projectImage} onChange={setProjectImage} />
          <BinaryOptionSelector<"필수" | "선택">
            title={"오프라인 정기모임 필수 여부"}
            option1={"필수"}
            option2={"선택"}
            onClickOption={setMustOffline}
          />
          <div className="flex flex-col gap-4 w-full">
            <b>나의 포지션</b>
            <FieldSelector />
          </div>
          <Recruit />
          <TechSearch />
          <div className="flex flex-col gap-4">
            <b>프로젝트 마감일</b>
            <DateSelector />
          </div>
        </div>
      </div>
      <footer className="flex flex-row justify-end gap-2 w-full border-t border-mtm-light-gray py-3 px-16">
        <SubButton
          buttonName="다음"
          width={4}
          height={4}
          onClick={() => router.push("/project-generate-step-2")}
        />
        <MainButton
          buttonName="등록하기"
          disabled={false}
          width={4}
          height={4}
        />
      </footer>
    </div>
  );
}
