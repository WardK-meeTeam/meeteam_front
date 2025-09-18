// 여기 isDay 프로젝트 지원에서 요일 고를때 사용할 props라서 무시해도 됨
interface ToggleButtonProps {
  content: string;
  isDay?: boolean;
  isSelected: boolean;
  value?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
// 기본 스타일 border-radius:20px, font-size : 14px
export default function ToggleButton({
  content,
  isDay,
  isSelected,
  value,
  onClick,
}: ToggleButtonProps) {
  const buttonStyle = isSelected
    ? "bg-mtm-light-blue border-mtm-main-blue"
    : "bg-transparent border-mtm-light-gray hover:bg-[#F4F9FF] hover:border-[#B5D9FF]";
  return (
    <button
      type="button"
      value={value}
      onClick={onClick}
      className={`border rounded-full text-[14px] inline-flex justify-center border-box items-center cursor-pointer transition-colors duration-600
        ${isDay ? "py-3 px-4 w-[45px] h-[41px]" : "py-3 px-8"}
        ${buttonStyle}`}
    >
      {content}
    </button>
  );
}
