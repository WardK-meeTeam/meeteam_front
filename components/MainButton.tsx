export interface MainButtonProps {
  buttonName: string;
  disabled: boolean;
  width?: number;
  height?: number;
  type: "button" | "submit" | "reset" | undefined;

  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function MainButton({
  buttonName,
  disabled,
  onClick,
  type = "button",
}: MainButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`rounded-[10px] border font-bold py-3 px-8 text-white ${disabled ? `bg-mtm-button-disabled border-mtm-button-disabled` : `bg-mtm-main-blue border-mtm-main-blue cursor-pointer`}`}
    >
      {buttonName}
    </button>
  );
}
