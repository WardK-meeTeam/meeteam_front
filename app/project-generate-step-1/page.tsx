"use client";
import BinaryOptionSelector from "@/components/BinaryOptionSelector";
import SelectableButtonGroup from "@/components/SelectableButtonGroup";
import ImageSelector from "./components/ImageSelector";
import Recruit from "./components/Recruit";
import TechSearch from "./components/TechSearch";
import DateSelector from "@/components/DateSelector";
import Input from "../../components/Input";
import { useProjectGenerateStore } from "@/store/projectGenerateStore";
import FieldSelector from "./components/FieldSelector";
import ProjectGenerateFooter from "@/components/ProjectGenerateFooter";

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
  const skills = useProjectGenerateStore((state) => state.skills);
  const projectDeadline = useProjectGenerateStore(
    (state) => state.projectDeadline,
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
  const setSkills = useProjectGenerateStore((state) => state.setSkills);
  const setProjectDeadline = useProjectGenerateStore(
    (state) => state.setProjectDeadline,
  );

  // const reset = useProjectGenerateStore((state) => state.reset);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // api 요청 보낼거임 나중에
    console.log("프로젝트 명 : ", projectName);
    console.log("카테고리 : ", projectCategories);
    console.log("플랫폼 : ", platform);
    console.log("이미지 주소 : ", projectImage);
    console.log("오프라인 필참 : ", mustOffline);
    console.log("나의 포지션 : ", myField);
    console.log("모집분야", recruitField);
    console.log("선택된 스킬", skills);
    console.log("데드라인", projectDeadline);
  };

  return (
    <form className="min-h-screen flex flex-col" onSubmit={handleSubmit}>
      <div className="w-[430px] m-auto justify-start flex flex-col flex-1 py-10 ">
        <b className="text-[26px] mb-10">프로젝트 등록</b>
        <div className="flex flex-col gap-16">
          <Input
            title="프로젝트 명"
            placeholder="프로젝트 이름을 입력해주세요"
            value={projectName}
            onValueChange={setProjectName}
          />
          <SelectableButtonGroup
            title={"프로젝트 카테고리"}
            subtitle="프로젝트 카테고리를 선택해주세요!"
            optionList={categories}
            value={projectCategories}
            onChange={setProjectCategories}
          />
          <SelectableButtonGroup
            title={"플랫폼"}
            optionList={platforms}
            value={platform}
            onChange={setPlatform}
          />
          <ImageSelector value={projectImage} onChange={setProjectImage} />
          <BinaryOptionSelector<"필수" | "선택">
            title={"오프라인 정기모임 필수 여부"}
            option1={"필수"}
            option2={"선택"}
            value={mustOffline}
            onChange={setMustOffline}
          />
          <div className="flex flex-col gap-4 w-full">
            <b>나의 포지션</b>
            <FieldSelector value={myField} onChange={setMyField} />
          </div>
          <Recruit value={recruitField} onChange={setRecruitField} />
          <TechSearch value={skills} onChange={setSkills} />
          <div className="flex flex-col gap-4">
            <b>프로젝트 마감일</b>
            <DateSelector
              value={projectDeadline}
              onChange={setProjectDeadline}
            />
          </div>
        </div>
      </div>
      <ProjectGenerateFooter step={1} />
    </form>
  );
}
