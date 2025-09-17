import Image from "next/image";
import CancleIcon from "@/public/images/cancle_icon.svg";

export default function SelectedTech({
  icon,
  onClick,
}: {
  icon: any;
  onClick: () => void;
}) {
  return (
    <span className="flex flex-row justify-center items-center gap-2 border border-mtm-main-blue bg-mtm-light-blue px-4 py-2 rounded-3xl">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill={`#${icon.hex}`}
      >
        <path d={icon.path} />
      </svg>
      <button className="cursor-pointer box-border" onClick={onClick}>
        <Image width={8} height={8} alt="X" src={CancleIcon} />
      </button>
    </span>
  );
}
