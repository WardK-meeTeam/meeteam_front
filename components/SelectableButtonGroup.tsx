"use client";
import ToggleButton from "@/components/ToggleButton";

export default function SelectableButtonGroup({
  title,
  subtitle,
  optionList,
  value,
  onChange,
}: {
  title: string;
  subtitle?: string;
  optionList: string[];
  value: string[];
  onChange: (selected: string[]) => void;
}) {
  function handleClickPartButton(part: string) {
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
        <span className="text-red-500 text-xs">{subtitle ? subtitle : ""}</span>
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
