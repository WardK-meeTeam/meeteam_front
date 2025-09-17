"use client";

import { useProjectGenerateStore } from "@/store/projectGenerateStore";
import MarkDown from "../../../../components/MarkDown";
import ProjectGenerateFooter from "@/components/ProjectGenerateFooter";

export default function Page() {
  const text = useProjectGenerateStore((state) => state.projectDescription);
  const setText = useProjectGenerateStore(
    (state) => state.setProjectDescription,
  );
  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-[1000px] m-auto flex flex-col justify-start py-10 flex-1 ">
        <b className="text-[26px] mb-10">프로젝트 등록</b>
        <MarkDown maxSize={800} text={text} onChangeText={setText} />
      </div>
      <ProjectGenerateFooter step={2} />
    </div>
  );
}
