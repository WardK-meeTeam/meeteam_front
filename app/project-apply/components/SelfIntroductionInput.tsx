import TextArea from "@/components/TextArea";

export default function SelfIntroductionInput() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <b>지원 사유 및 자기소개</b>
        <span className="text-[#6BB4FF]">
          설명글은 800자 이내로 작성해 주세요!
        </span>
      </div>
      <TextArea maxSize={800} />
    </div>
  );
}
