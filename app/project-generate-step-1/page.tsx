"use client";
import BinaryOptionSelector from "@/components/BinaryOptionSelector";
import Selectable from "@/components/Selectable";
import SelectableButtonGroup from "@/components/SelectableButtonGroup";
import ImageSelector from "./components/ImageSelector";
import Recruit from "./components/Recruit";
import TechSearch from "./components/TechSearch";
import DateSelector from "@/components/DateSelector";
import MainButton from "@/components/MainButton";
import SubButton from "@/components/SubButton";
import { useRouter } from "next/navigation";
import Input from "./components/Input";

const categories = [
  "친환경☘️",
  "반려동물🐱",
  "헬스케어💪",
  "교육/학습📚",
  "AI/테크💻",
  "패션/뷰티💄",
];
const flatforms = ["iOS", "Android", "Web"];
const options = ["iOS", "Android", "Web"];

export default function Page() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-[430px] m-auto justify-start flex flex-col flex-1 py-10 ">
        <b className="text-[26px] mb-10">프로젝트 등록</b>
        <div className="flex flex-col gap-16">
          <Input
            title="프로젝트 명"
            placeholder="프로젝트 이름을 입력해주세요"
          />
          <SelectableButtonGroup
            title={"프로젝트 카테고리"}
            subtitle="프로젝트 카테고리를 선택해주세요!"
            optionList={categories}
          />
          <SelectableButtonGroup title={"플랫폼"} optionList={flatforms} />
          <ImageSelector />
          <BinaryOptionSelector
            title={"오프라인 정기모임 필수 여부"}
            option1={"필수"}
            option2={"선택"}
          />
          <div className="flex flex-col gap-4 w-full">
            <b>나의 포지션</b>
            <div className="w-full flex flex-1 flex-row gap-2">
              <Selectable options={options} />
              <Selectable options={options} />
            </div>
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
