import { convertSubCategory } from "@/utils/subCategoryMap";
import { useRouter } from "next/navigation";

interface ApplyButtonProps {
  disabled: boolean;
  projectId: string;
  subCategory: string;
}

export default function ApplyButton({
  disabled,
  projectId,
  subCategory,
}: ApplyButtonProps) {
  const router = useRouter();
  return (
    <button
      disabled={disabled}
      onClick={() =>
        router.push(
          `/projects/${projectId}/apply?category=${convertSubCategory(subCategory)}`,
        )
      }
      className={`flex justify-center items-center py-2 px-6 box-border
        ${disabled ? "bg-mtm-light-gray text-mtm-text-gray" : "bg-black text-white cursor-pointer"}
    text-[14px] font-semibold w-[104px] h-[33px] rounded-sm
    `}
    >
      {disabled ? "지원마감" : "지원하기"}
    </button>
  );
}
