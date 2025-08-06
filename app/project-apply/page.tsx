import { projectApplyUserData } from "@/mocks/projectApplyUserData";
import SelectableButtonGroup from "../../components/SelectableButtonGroup";
import AvailableDaysSelector from "./components/AvailableDaysSelector";
import BinaryOptionSelector from "../../components/BinaryOptionSelector";
import SelfIntroductionInput from "./components/SelfIntroductionInput";
import UserProfileSummary from "./components/UserProfileSummary";
import NumberStepper from "../../components/NumberStepper";

export default function Page() {
  const partList = ["프론트", "백", "디자인", "기획", "마케팅"];
  return (
    <div className="w-[420px] m-auto flex flex-col py-10">
      <b className="text-[26px] mb-10">프로젝트 지원</b>
      <div className="flex flex-col gap-16">
        <SelectableButtonGroup title={"지원 분야"} optionList={partList} />
        <SelfIntroductionInput />
        <NumberStepper
          title={"주당 투자 가능 시간"}
          initValue={1}
          min={0}
          max={168}
          warningMessage={"시간은 0시간 이상 168시간 이하로 입력해주세요!"}
        />
        <AvailableDaysSelector />
        <BinaryOptionSelector
          title={"오프라인 참여 가능 여부"}
          option1={"가능"}
          option2={"불가능"}
        />
        <UserProfileSummary {...projectApplyUserData} />
      </div>
    </div>
  );
}
