"use client";

import ToggleButton from "@/components/ToggleButton";

export default function BinaryOptionSelector<T extends string>({
  title,
  option1,
  option2,
  value,
  onChange,
}: {
  title: string;
  option1: T;
  option2: T;
  value: T;
  onChange: (op: T) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <b>{title}</b>
      <div className="flex gap-3">
        <ToggleButton
          content={option1}
          isSelected={value === option1}
          onClick={() => onChange(option1)}
        />
        <ToggleButton
          content={option2}
          isSelected={value === option2}
          onClick={() => onChange(option2)}
        />
      </div>
    </div>
  );
}
