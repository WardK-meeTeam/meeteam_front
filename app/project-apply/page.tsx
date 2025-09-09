"use client";
import { projectApplyUserData } from "@/mocks/projectApplyUserData";
import AvailableDaysSelector from "./components/AvailableDaysSelector";
import BinaryOptionSelector from "../../components/BinaryOptionSelector";
import SelfIntroductionInput from "./components/SelfIntroductionInput";
import UserProfileSummary from "./components/UserProfileSummary";
import NumberStepper from "../../components/NumberStepper";
import { useEffect, useState } from "react";
import MainButton from "@/components/MainButton";

export default function Page() {
  const [introduction, setIntroduction] = useState<string>("");
  const [canOffline, setCanOffline] = useState<"가능" | "불가능">("불가능");
  const [useTime, setUseTime] = useState<number>(1);
  const [days, setDays] = useState<string[]>([]);
  const [isValid, setIsValid] = useState<boolean>(false);

  function checkField() {
    if (introduction === "") return false;
    if (days.length === 0) return false;
    return true;
  }

  useEffect(() => {
    setIsValid(checkField());
  }, [introduction, days]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!checkField) return;
    // api post 보내기
    // console.log(introduction, canOffline, useTime, days);
  };
  return (
    <form className="min-h-screen flex flex-col" onSubmit={handleSubmit}>
      <div className="w-[430px] m-auto justify-start flex flex-col flex-1 py-10 ">
        <b className="text-[26px] mb-10">프로젝트 지원</b>
        <div className="flex flex-col gap-16">
          <SelfIntroductionInput
            value={introduction}
            onChange={setIntroduction}
          />
          <NumberStepper
            title={"주당 투자 가능 시간"}
            value={useTime}
            onChange={setUseTime}
            min={0}
            max={168}
            warningMessage={"시간은 0시간 이상 168시간 이하로 입력해주세요!"}
          />
          <AvailableDaysSelector value={days} onChange={setDays} />
          <BinaryOptionSelector<"가능" | "불가능">
            title={"오프라인 참여 가능 여부"}
            option1={"가능"}
            option2={"불가능"}
            value={canOffline}
            onChange={setCanOffline}
          />
          <UserProfileSummary {...projectApplyUserData} />
        </div>
      </div>
      <footer className="flex flex-row justify-end gap-2 w-full border-t border-mtm-light-gray py-3 px-16">
        <MainButton buttonName="지원하기" disabled={!isValid} />
      </footer>
    </form>
  );
}
