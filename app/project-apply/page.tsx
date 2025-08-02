import { projectApplyUserData } from "@/mocks/projectApplyUserData";
import ApplyFieldSelector from "./components/ApplyFieldSelector";
import AvailableDaysSelector from "./components/AvailableDaysSelector";
import OfflineAvailabilityToggle from "./components/OfflineAvailabilityToggle";
import SelfIntroductionInput from "./components/SelfIntroductionInput";
import UserProfileSummary from "./components/UserProfileSummary";
import WeeklyHourInput from "./components/WeeklyHourInput";

export default function Page() {
  return (
    <div className="w-[420px] m-auto flex flex-col py-10">
      <b className="text-[26px] mb-10">프로젝트 지원</b>
      <div className="flex flex-col gap-15">
        <ApplyFieldSelector />
        <SelfIntroductionInput />
        <WeeklyHourInput />
        <AvailableDaysSelector />
        <OfflineAvailabilityToggle />
        <UserProfileSummary {...projectApplyUserData} />
      </div>
    </div>
  );
}
