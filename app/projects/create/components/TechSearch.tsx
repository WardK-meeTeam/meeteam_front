"use client";
import { TechStackOption, techStackOptions } from "@/mocks/techs";
import { useEffect, useRef, useState } from "react";
import * as simpleIcons from "simple-icons";
import SelectedTech from "./SelectedTech";
import type { SimpleIcon } from "simple-icons";

export default function TechSearch({
  title,
  value,
  onChange,
  errors,
}: {
  title: string;
  value: string[];
  onChange: (skills: string[]) => void;
  errors?: string[];
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState<string>("");

  const ICONS = simpleIcons as unknown as Record<string, SimpleIcon>;

  const searchedStacks = techStackOptions.filter(
    (stack) =>
      stack.kor.includes(search) ||
      stack.eng.toLowerCase().includes(search.toLowerCase()),
  );

  const selectedStacks = techStackOptions.filter((option) =>
    value.includes(option.eng),
  );

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleAddStack = (stack: TechStackOption) => {
    if (!value.includes(stack.eng)) {
      onChange([...value, stack.eng]);
    }
  };

  const handleDeleteStack = (stack: TechStackOption) => {
    onChange(value.filter((item) => item !== stack.eng));
  };

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
    <div className="flex flex-col gap-1">
      <div className="flex flex-col gap-4">
        {title !== "" ? <b>{title}</b> : ""}

        <div ref={rootRef} className="relative">
          <input
            type="text"
            value={search}
            onClick={() => setOpen(true)}
            onChange={handleChangeSearch}
            placeholder="기술 스택을 검색해주세요"
            className={`w-full rounded-xl py-3 px-5 box-border border 
              transition-colors duration-500 ease-in-out
            ${open ? "border-mtm-main-blue" : "border-mtm-light-gray "}
            ${errors?.length ? "border-red-500" : ""}

            focus:border-mtm-main-blue hover:border-mtm-main-blue outline-0`}
          />
          {/* 여기는 눌렀을 때 나오는 검색 창 */}
          {open && (
            <ul
              className="
            flex flex-col gap-1
            w-full
            absolute
            left-0
            max-h-48 overflow-auto
            rounded-xl border-none bg-white shadow-[0_4px_22px_rgba(0,0,0,0.15)]
            p-1 z-50
          "
            >
              {searchedStacks.map((item) => {
                const icon = ICONS[item.iconName];
                if (!icon) return null;
                const isSelected = value.includes(item.eng);
                return (
                  <li
                    key={`TechStacks-${item.eng}`}
                    value={item.eng}
                    onClick={() => {
                      if (!isSelected) handleAddStack(item);
                    }}
                    className={`px-3 py-2 rounded-lg ${
                      isSelected
                        ? "cursor-not-allowed text-gray-400"
                        : "hover:bg-mtm-light-blue cursor-pointer"
                    }`}
                  >
                    <span className="flex flex-row gap-4">
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
                      {item.eng}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* 선택된 기술 스택 보여줄 곳 */}
        <div className="flex flex-row flex-wrap justify-start gap-4">
          {selectedStacks.map((item) => {
            const icon = ICONS[item.iconName];
            if (!icon) return null;
            return (
              <SelectedTech
                key={`SelectedTechStack-${item.eng}`}
                icon={icon}
                onClick={() => handleDeleteStack(item)}
              />
            );
          })}
        </div>
      </div>
      {errors?.length ? (
        <span className="text-red-500 text-sm">{errors[0]}</span>
      ) : null}
    </div>
  );
}
