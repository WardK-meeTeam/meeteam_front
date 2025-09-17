"use client";
import ToggleButton from "@/components/ToggleButton";

export default function SelectableButtonGroup({
  title,
  errors,
  optionList,
  value,
  onChange,
  onlySelectOne = false,
}: {
  title: string;
  errors?: string;
  optionList: string[];
  value: string[];
  onChange: (selected: string[]) => void;
  onlySelectOne?: boolean;
}) {
  function handleClickPartButton(part: string) {
    if (onlySelectOne) {
      // 그룹 중에서 1개만 선택되어야 하기 떄문에 그냥 기존거 무시하고 자기만 들어가면 됨
      onChange([part]);
      return;
    }
    const isSelected = value.includes(part);
    if (isSelected) {
      onChange(value.filter((item) => item !== part));
    } else {
      onChange([...value, part]);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-2 items-center">
        <b>{title}</b>
        <span className="text-red-500 text-xs">{errors ? errors : ""}</span>
      </div>
      <div className="flex flex-row flex-wrap w-full gap-3">
        {optionList.map((part) => (
          <ToggleButton
            key={part}
            content={part}
            isSelected={value.includes(part)}
            onClick={() => handleClickPartButton(part)}
          />
        ))}
      </div>
    </div>
  );
}
