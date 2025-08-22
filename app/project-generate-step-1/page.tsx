import BinaryOptionSelector from "@/components/BinaryOptionSelector";
import Selectable from "@/components/Selectable";
import SelectableButtonGroup from "@/components/SelectableButtonGroup";
import ImageSelector from "./components/ImageSelector";
import Recruit from "./components/Recruit";
import TechSearch from "./components/TechSearch";
import DateSelector from "@/components/DateSelector";
import MainButton from "@/components/MainButton";
import SubButton from "@/components/SubButton";

const categories = ["프론트(웹)", "백(웹)", "디자인", "기획", "마케팅"];
const flatforms = ["iOS", "Android", "Web"];
const options = ["iOS", "Android", "Web"];

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-[420px] m-auto flex flex-col py-10 ">
        <b className="text-[26px] mb-10">프로젝트 등록</b>
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-4">
            <b>프로젝트 명</b>
            <input
              placeholder="프로젝트 이름을 입력해주세요"
              className="rounded-xl py-3 px-5 box-border border border-main outline-0"
            />
          </div>
          <SelectableButtonGroup
            title={"프로젝트 카테고리"}
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
        <SubButton buttonName="다음" width={4} height={4} />
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
