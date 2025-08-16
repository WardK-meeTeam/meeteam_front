"use client";

import ArrowDown from "@/public/images/ArrowDown.svg";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
export default function Selectable({ options }: { options: string[] }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const handleClickoption = (item: string) => {
    setOpen(false);
    setSelected(item);
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
        className="
          border rounded-xl text-[14px] p-3
          w-full flex items-center justify-between gap-2
          border-gray-300 hover:border-[#B5D9FF]
          bg-white
        "
      >
        <span className="text-gray-700">
          {selected !== null ? `${selected}` : "선택하세요"}
        </span>
        {/* 아래 화살표 아이콘 */}
        <Image
          className={`transition-transform duration-150 ease-out ${open ? "rotate-180" : ""}`}
          width={16}
          height={16}
          src={ArrowDown}
          alt="아래 화살표"
        />
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
              key={`나중에 키 수정해주세요 - ${item}`}
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
