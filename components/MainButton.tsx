export interface MainButtonProps {
  buttonName: string;
  disabled: boolean;
  width?: number;
  height?: number;
  type?: "button" | "submit" | "reset" | undefined;
  invertedColor?: boolean;

  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function MainButton({
  buttonName,
  disabled,
  onClick,
  type = "button",
  invertedColor = false,
}: MainButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`rounded-[10px] border font-bold py-3 px-8 ${
        disabled
          ? `bg-mtm-button-disabled border-mtm-button-disabled text-white`
          : invertedColor
            ? "bg-mtm-light-blue border-mtm-light-blue cursor-pointer text-mtm-main-blue"
            : `bg-mtm-main-blue border-mtm-main-blue cursor-pointer text-white`
      }`}
    >
      {buttonName}
    </button>
  );
}
