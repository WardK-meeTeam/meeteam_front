interface ToggleButtonProps {
  content: string;
  width: number;
  height: number;
  isSelected: boolean;
  onClick: () => void;
}
// 기본 스타일 border-radius:20px, font-size : 14px
export default function ToggleButton({
  content,
  width,
  height,
  isSelected,
  onClick,
}: ToggleButtonProps) {
  const buttonStyle = isSelected
    ? "bg-mtm-light-blue border-mtm-main-blue"
    : "bg-transparent border-mtm-light-gray hover:bg-[#F4F9FF] hover:border-[#B5D9FF]";
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ width: `${width}px`, height: `${height}px` }}
      className={`border rounded-[20px] text-[14px] flex justify-center items-center cursor-pointer ${buttonStyle}`}
    >
      {content}
    </button>
  );
}
