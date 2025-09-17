"use client";
import { projectApplyUserData } from "@/mocks/projectApplyUserData";
import AvailableDaysSelector from "./components/AvailableDaysSelector";

import SelfIntroductionInput from "./components/SelfIntroductionInput";
import UserProfileSummary from "./components/UserProfileSummary";

import { useEffect, useState } from "react";
import MainButton from "@/components/MainButton";
import NumberStepper from "@/components/NumberStepper";
import BinaryOptionSelector from "@/components/BinaryOptionSelector";

interface ApplyFormData {
  introduction: string;
  canOffline: "가능" | "불가능";
  useTime: number;
  days: string[];
}

export default function Page() {
  const [formData, setFormData] = useState<ApplyFormData>({
    introduction: "",
    canOffline: "가능",
    useTime: 1,
    days: [],
  });

  const handleIntroductionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      introduction: value,
    }));
  };

  const handleDaysChange = (newDays: string[]) => {
    setFormData((prev) => ({
      ...prev,
      days: newDays,
    }));
  };

  const handleTimeChange = (newTime: number) => {
    setFormData((prev) => ({
      ...prev,
      useTime: newTime,
    }));
  };

  const handleCanOfflineChange = (newOffline: "가능" | "불가능") => {
    setFormData((prev) => ({
      ...prev,
      canOffline: newOffline,
    }));
  };

  const [isValid, setIsValid] = useState<boolean>(false);

  function checkField() {
    if (formData.introduction === "") return false;
    if (formData.days.length === 0) return false;
    return true;
  }

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
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
            value={formData.introduction}
            onChange={handleIntroductionChange}
          />
          <NumberStepper
            title={"주당 투자 가능 시간"}
            value={formData.useTime}
            onChange={handleTimeChange}
            min={0}
            max={168}
            warningMessage={"시간은 0시간 이상 168시간 이하로 입력해주세요!"}
          />
          <AvailableDaysSelector
            value={formData.days}
            onChange={handleDaysChange}
          />
          <BinaryOptionSelector<"가능" | "불가능">
            title={"오프라인 참여 가능 여부"}
            option1={"가능"}
            option2={"불가능"}
            value={formData.canOffline}
            onChange={handleCanOfflineChange}
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
