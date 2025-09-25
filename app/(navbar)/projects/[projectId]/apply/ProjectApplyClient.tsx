"use client";
import AvailableDaysSelector from "./components/AvailableDaysSelector";

import SelfIntroductionInput from "./components/SelfIntroductionInput";
import UserProfileSummary from "./components/UserProfileSummary";

import { useState } from "react";
import MainButton from "@/components/MainButton";
import NumberStepper from "@/components/NumberStepper";
import BinaryOptionSelector from "@/components/BinaryOptionSelector";
import { projectApplySchema } from "@/types/projectApply";
import { useRouter, useSearchParams } from "next/navigation";
import { convertSubCategory } from "@/utils/subCategoryMap";
import { authFetch } from "@/api/authFetch";

interface ApplyFormData {
  introduction: string;
  canOffline: "가능" | "불가능";
  useTime: number;
  availableDays: string[];
}

export default function ProjectApplyClient({
  projectId,
}: {
  projectId: string;
}) {
  const [formData, setFormData] = useState<ApplyFormData>({
    introduction: "",
    canOffline: "가능",
    useTime: 1,
    availableDays: [],
  });
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>(
    {},
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // url 파라미터로부터 지원할 분야 소분류 가져오기
  const searchParams = useSearchParams();
  const subCategory = searchParams.get("category");
  const router = useRouter();

  // Change 이벤트 핸들러들
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
      availableDays: newDays,
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Zod로 정의해놓은 형식과 같은 형식의 입력값인지 확인
    const result = projectApplySchema.safeParse(formData);
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    // 에러 초기화
    setErrors({});

    const dataForApi = {
      motivation: formData.introduction,
      offlineAvailable: formData.canOffline === "가능" ? "true" : "false",
      availableDays: formData.availableDays.join(","), // 배열로 되어있는 애를 문자열 나열식으로 바꿈
      availableHoursPerWeek: formData.useTime.toString(),
      projectId: projectId,
      subCategory: convertSubCategory(subCategory ?? ""),
    };

    const urlEncodedData = new URLSearchParams(dataForApi);

    const API = process.env.NEXT_PUBLIC_API_BASE_URL;

    setIsLoading(true);
    try {
      const response = await authFetch(`${API}/api/projects-application`, {
        method: "POST",

        body: urlEncodedData,
      });

      if (response.ok) {
        alert("프로젝트 지원 성공");
        router.push(`/projects/${projectId}/detail`);
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      alert(`알 수 없는 오류가 발생했습니다. (${error})`);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <form className="min-h-screen flex flex-col" onSubmit={handleSubmit}>
        <div className="w-[430px] m-auto justify-start flex flex-col flex-1 py-10 ">
          <b className="text-[26px] mb-10">프로젝트 지원</b>
          <div className="flex flex-col gap-16">
            <SelfIntroductionInput
              value={formData.introduction}
              onChange={handleIntroductionChange}
              errors={errors.introduction}
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
              value={formData.availableDays}
              onChange={handleDaysChange}
              errors={errors.availableDays}
            />
            <BinaryOptionSelector<"가능" | "불가능">
              title={"오프라인 참여 가능 여부"}
              option1={"가능"}
              option2={"불가능"}
              value={formData.canOffline}
              onChange={handleCanOfflineChange}
            />
            <UserProfileSummary />
          </div>
        </div>
        <footer className="flex flex-row justify-end gap-2 w-full border-t border-mtm-light-gray py-3 px-16">
          <MainButton
            buttonName="지원하기"
            type="submit"
            disabled={isLoading}
          />
        </footer>
      </form>
    </>
  );
}
