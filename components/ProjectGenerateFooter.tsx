"use client";
import { useRouter } from "next/navigation";
import MainButton from "./MainButton";
import SubButton from "./SubButton";
import { useEffect, useState } from "react";
import { useProjectGenerateStore } from "@/store/projectGenerateStore";

export default function ProjectGenerateFooter({ step }: { step: number }) {
  const router = useRouter();
  const [isValid, setIsValid] = useState(false);

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
  const projectDescription = useProjectGenerateStore(
    (state) => state.projectDescription,
  );

  function checkField() {
    if (projectName === "") return false;
    if (projectCategories.length === 0) return false;
    if (platform.length === 0) return false;
    // 이미지는 선택
    if (myField === "") return false;
    if (recruitField.length === 0) return false;
    if (skills.length === 0) return false;
    if (projectDeadline === null || projectDeadline.length < 10) return false;
    if (projectDescription === "") return false;

    return true;
  }

  useEffect(() => {
    const newValid = checkField();
    setIsValid(newValid);
  }, [
    projectName,
    projectCategories,
    platform,
    myField,
    recruitField,
    skills,
    projectDeadline,
    projectDescription,
  ]);
  return (
    <footer className="flex flex-row justify-end gap-2 w-full border-t border-mtm-light-gray py-3 px-16">
      <SubButton
        buttonName={step === 1 ? "다음" : "이전"}
        onClick={
          step === 1
            ? () => router.push("/project-generate-step-2")
            : () => router.back()
        }
      />
      <MainButton buttonName="등록하기" disabled={!isValid} />
    </footer>
  );
}
