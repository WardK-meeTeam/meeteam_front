import { InputHTMLAttributes } from "react";

type InputProps = {
  title?: string;
  placeholder?: string;
  value: string;
  errors?: string[];
  onValueChange?: (str: string) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };

export default function Input({
  title,
  placeholder,
  value,
  errors = [],
  onValueChange,
  onChange,
  ...rest
}: InputProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange?.(e); // 기존 html input태그 그대로 사용시는 이거
    onValueChange?.(e.target.value); // Zustand로 제어 컴포넌트 만들기 위함은 이거
  }

  return (
    <div className="flex flex-col gap-4">
      {title && <h1 className="font-bold">{title}</h1>}
      <input
        placeholder={placeholder ?? ""}
        value={value}
        onChange={handleChange}
        className="rounded-xl py-3 px-5 box-border border border-mtm-light-gray focus:border-mtm-main-blue hover:border-mtm-main-blue outline-0"
        {...rest}
      />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}
