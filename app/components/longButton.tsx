"use client";

import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
  marginTop?: string;
  disabled?: boolean; // 추가
}

export default function LongButton({ text, marginTop, disabled }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending || disabled}
      className={`primary-btn h-10 w-96 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed ${marginTop}`}
    >
      {pending ? "로딩 중..." : text}
    </button>
  );
}
