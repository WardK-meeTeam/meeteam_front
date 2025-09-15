"use client";

import MainButton from "@/components/MainButton";
import MarkDown from "@/components/MarkDown";
import { useSignUpStore } from "@/store/signupDataStore";
import { useRouter } from "next/navigation";

export default function Page() {
  const text = useSignUpStore((state) => state.introduction);
  const setText = useSignUpStore((state) => state.setIntroduction);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // api 요청해야함
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="min-h-screen flex flex-col">
        <div className="w-[1000px] m-auto flex flex-col justify-start py-10 flex-1">
          <b className="text-[26px] mb-10">자기 소개</b>
          <MarkDown maxSize={600} text={text} onChangeText={setText} />
        </div>
        <footer className="flex flex-row justify-end gap-2 w-full border-t border-mtm-light-gray py-3 px-16">
          <MainButton
            buttonName="소개 등록하기"
            type="submit"
            disabled={false}
          />
        </footer>
      </div>
    </form>
  );
}
