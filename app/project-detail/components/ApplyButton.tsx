export default function ApplyButton({ disabled }: { disabled: boolean }) {
  return (
    <button
      disabled={disabled}
      className={`flex justify-center items-center py-2 px-6 box-border
        ${disabled ? "bg-mtm-light-gray text-mtm-text-gray" : "bg-black text-white cursor-pointer"}
    text-[14px] font-semibold w-[104px] h-[33px] rounded-sm
    `}
    >
      {disabled ? "지원마감" : "지원하기"}
    </button>
  );
}
