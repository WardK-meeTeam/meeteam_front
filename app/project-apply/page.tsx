import { projectApplyUserData } from "@/mocks/projectApplyUserData";
import SelectableButtonGroup from "../../components/SelectableButtonGroup";
import AvailableDaysSelector from "./components/AvailableDaysSelector";
import OfflineAvailabilityToggle from "./components/OfflineAvailabilityToggle";
import SelfIntroductionInput from "./components/SelfIntroductionInput";
import UserProfileSummary from "./components/UserProfileSummary";
import WeeklyHourInput from "./components/WeeklyHourInput";

export default function Page() {
  const partList = ["프론트", "백", "디자인", "기획", "마케팅"];
  return (
    <div className="w-[420px] m-auto flex flex-col py-10">
      <b className="text-[26px] mb-10">프로젝트 지원</b>
      <div className="flex flex-col gap-15">
        <SelectableButtonGroup title={"지원 분야"} optionList={partList} />
        <SelfIntroductionInput />
        <WeeklyHourInput />
        <AvailableDaysSelector />
        <OfflineAvailabilityToggle />
        <UserProfileSummary {...projectApplyUserData} />
      </div>
    </div>
  );
}
