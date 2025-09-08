import MarkDown from "./components/MarkDown";
import ProjectGenerateFooter from "@/components/ProjectGenerateFooter";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-[1000px] m-auto flex flex-col justify-start py-10 flex-1 ">
        <b className="text-[26px] mb-10">프로젝트 등록</b>
        <MarkDown />
      </div>
      <ProjectGenerateFooter step={2} />
    </div>
  );
}
