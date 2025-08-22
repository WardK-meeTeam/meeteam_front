"use client";
import MainButton from "@/components/MainButton";
import SubButton from "@/components/SubButton";
import { useRouter } from "next/navigation";
import MarkDown from "./components/MarkDown";

export default function Page() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-[1000px] m-auto flex flex-col justify-start py-10 flex-1 ">
        <b className="text-[26px] mb-10">프로젝트 등록</b>
        <MarkDown />
      </div>
      <footer className="flex flex-row justify-end gap-2 w-full border-t border-mtm-light-gray py-3 px-16">
        <SubButton
          buttonName="이전"
          width={4}
          height={4}
          onClick={() => router.back()}
        />
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
