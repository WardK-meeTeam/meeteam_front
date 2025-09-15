import { MainButtonProps } from "./MainButton";

interface SubButtonProps
  extends Pick<MainButtonProps, "buttonName" | "onClick" | "type"> {}

export default function SubButton({
  buttonName,
  onClick,
  type,
}: SubButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-[10px] font-bold py-3 px-8 border border-mtm-light-gray cursor-pointer text-mtm-text-gray`}
    >
      {buttonName}
    </button>
  );
}
