import TextArea from "@/components/TextArea";

export default function SelfIntroductionInput({
  value,
  onChange,
  errors,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  errors?: string[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <b>지원 사유 및 자기소개</b>
        {errors?.length ? (
          <span className="text-red-500 text-sm">{errors[0]}</span>
        ) : null}
      </div>
      <TextArea
        maxSize={800}
        value={value}
        onChange={onChange}
        errors={errors}
      />
    </div>
  );
}
