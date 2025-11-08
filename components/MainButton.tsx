export interface MainButtonProps {
  buttonName: string;
  disabled: boolean;
  width?: number;
  height?: number;
  type?: "button" | "submit" | "reset" | undefined;
  invertedColor?: boolean;
  customClass?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function MainButton({
  buttonName,
  disabled,
  onClick,
  type = "button",
  invertedColor = false,
  customClass,
  ...others
}: MainButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`rounded-[10px] border font-bold py-3 px-8 ${
        disabled
          ? `text-white bg-mtm-button-disabled border-mtm-button-disabled`
          : invertedColor
            ? "cursor-pointer bg-mtm-light-blue border-mtm-light-blue text-mtm-main-blue"
            : `text-white cursor-pointer bg-mtm-main-blue border-mtm-main-blue`
      } ${customClass}`}
      {...others}
    >
      {buttonName}
    </button>
  );
}
