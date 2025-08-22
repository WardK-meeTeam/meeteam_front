import { MainButtonProps } from "./MainButton";

interface SubButtonProps
  extends Pick<
    MainButtonProps,
    "buttonName" | "width" | "height" | "onClick"
  > {}

export default function SubButton({
  buttonName,
  width,
  height,
  onClick,
}: SubButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-[10px] font-bold py-3 px-8 border border-mtm-light-gray cursor-pointer text-mtm-text-gray`}
    >
      {buttonName}
    </button>
  );
}
