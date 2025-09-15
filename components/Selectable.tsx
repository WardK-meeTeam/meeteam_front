"use client";

import ArrowDown from "@/public/images/ArrowDown.svg";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
export default function Selectable({
  options = [],
  disabled = false,
  value,
  onChangeOption,
}: {
  options: string[];
  disabled?: boolean;
  value?: string | null;
  onChangeOption: (item: any) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const handleClickoption = (item: string) => {
    setOpen(false);
    onChangeOption(item);
  };

  // 컴포넌트 외부 클릭하면 닫히는 로직
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (rootRef.current && !rootRef.current.contains(t)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  return (
    <div ref={rootRef} className="relative inline-block flex-1">
      <button
        type="button"
        onClick={() => setOpen(true)}
        disabled={disabled}
        className={`
          border rounded-xl text-[14px] p-3
          w-full flex items-center justify-between gap-2
          ${disabled ? "border-gray-200" : "hover:border-mtm-main-blue border-mtm-light-gray "}
          bg-white 
        `}
      >
        <span className={`${disabled ? "text-gray-300" : "text-gray-700"}`}>
          {value ?? "선택하세요"}
        </span>
        {/* 아래 화살표 아이콘 */}
        {disabled ? (
          ""
        ) : (
          <Image
            className={`transition-transform duration-150 ease-out ${open ? "rotate-180" : ""}`}
            width={16}
            height={16}
            src={ArrowDown}
            alt="아래 화살표"
          />
        )}
      </button>
      {open && (
        <ul
          className="
          w-full
            absolute left-0
            max-h-48 overflow-auto
            rounded-xl border-none bg-white shadow-[0_4px_22px_rgba(0,0,0,0.15)]
            p-1 z-50

          "
        >
          {/* 여기 키도 수정 한번 해야함 */}
          {options.map((item) => (
            <li
              key={`options - ${item}`}
              onClick={() => handleClickoption(item)}
              value={item}
              className="px-3 py-2 rounded-lg cursor-pointer hover:bg-[#F4F9FF]"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
