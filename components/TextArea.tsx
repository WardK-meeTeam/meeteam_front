export default function TextArea({
  maxSize,
  value,
  onChange,
  onValueChange,
  errors,
}: {
  maxSize: number;
  value: string;
  onValueChange?: (str: string) => void;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  errors?: string[];
}) {
  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const text = e.target.value;
    if (text.length <= maxSize) {
      // maxLength 속성 안쓰고 직접 제어 글자수가 maxSize 이하일 때만 입력되도록
      onChange?.(e); // 기존 html input태그 그대로 사용시는 이거
      onValueChange?.(e.target.value); // Zustand로 제어 컴포넌트 만들기 위함은 이거
    }
  }
  return (
    <>
      <textarea
        value={value}
        onChange={handleInputChange}
        className={`w-full h-[215px] border border-mtm-light-gray p-5 rounded-xl overflow-x-hidden overflow-y-auto resize-none 
        outline-none focus:outline-mtm-main-blue hover:border-mtm-main-blue
        ${errors ? "border-red-500 hover:border-red-500" : ""}
        transition-colors duration-500 ease-in-out`}
      />
      <div className="flex gap-1 text-[12px] justify-end">
        <span>{value.length}</span>
        <span className="text-mtm-text-gray">/ {maxSize}자</span>
      </div>
    </>
  );
}
