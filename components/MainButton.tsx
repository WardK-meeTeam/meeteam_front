export interface MainButtonProps {
  buttonName: string;
  disabled: boolean;
  width?: number;
  height?: number;
  onClick?: () => void;
}

export default function MainButton({
  buttonName,
  disabled,
  width,
  height,
  onClick,
}: MainButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`rounded-[10px] border font-bold py-3 px-8 text-white ${disabled ? `bg-mtm-button-disabled border-mtm-button-disabled` : `bg-main border-main cursor-pointer`}`}
    >
      {buttonName}
    </button>
  );
}
