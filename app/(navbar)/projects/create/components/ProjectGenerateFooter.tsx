"use client";
import { useRouter } from "next/navigation";
import MainButton from "../../../../../components/MainButton";
import SubButton from "../../../../../components/SubButton";

export default function ProjectGenerateFooter({
  step,
  isSubmitting = false,
}: {
  step: number;
  isSubmitting?: boolean;
}) {
  const router = useRouter();

  return (
    <footer className="flex flex-row justify-end gap-2 w-full border-t border-mtm-light-gray py-3 px-16">
      <SubButton
        type={step === 1 ? "submit" : "button"}
        buttonName={step === 1 ? "다음" : "이전"}
        onClick={step === 1 ? () => {} : () => router.back()}
      />
      {step === 2 && (
        <MainButton
          buttonName="등록하기"
          type="submit"
          disabled={isSubmitting}
        />
      )}
    </footer>
  );
}
