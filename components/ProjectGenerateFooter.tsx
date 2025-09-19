"use client";
import { useRouter } from "next/navigation";
import MainButton from "./MainButton";
import SubButton from "./SubButton";

export default function ProjectGenerateFooter({ step }: { step: number }) {
  const router = useRouter();

  return (
    <footer className="flex flex-row justify-end gap-2 w-full border-t border-mtm-light-gray py-3 px-16">
      <SubButton
        type="button"
        buttonName={step === 1 ? "다음" : "이전"}
        onClick={
          step === 1
            ? () => router.push("/projects/create?step=2")
            : () => router.back()
        }
      />
      <MainButton buttonName="등록하기" type="submit" disabled={false} />
    </footer>
  );
}
