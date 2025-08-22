"use client";
import { TechStackOption, techStackOptions } from "@/mocks/techs";
import { useEffect, useRef, useState } from "react";
import * as icons from "simple-icons";
import SelectedTech from "./SelectedTech";

export default function TechSearch() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLInputElement>(null);

  // 검색창 입력값에 따라서 뜨는 기술 스택, 선택된 기술 스택을 따로 담아줘야함
  const [search, setSearch] = useState<string>("");
  const [searchedStacks, setSearchedStacks] =
    useState<TechStackOption[]>(techStackOptions);
  const [selectedStacks, setSelectedStacks] = useState<TechStackOption[]>([]);

  // 검색했을 때 입력한 결과로 필터링된 기술스택들 보여줌
  // 대소문자 구분 X, 영문,한글 검색 다됨
  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    setSearchedStacks(
      techStackOptions.filter(
        (stack) =>
          stack.kor.includes(value) ||
          stack.eng.toLowerCase().includes(value.toLowerCase()),
      ),
    );
  };

  // 기술스택 누르면 추가
  const handleAddStack = (stack: TechStackOption) => {
    // 객체 하나른 받고, 객체 자체를 추가하는 것

    setSelectedStacks((prev) => [...prev, stack]);
  };

  // 기술스택 누르면 삭제
  const handleDelteStack = (stack: TechStackOption) => {
    // 객체로 비교, 어차피 기술 스택은 중복해서 넣지 않으니까 이렇게 간단히 해도 될거같음
    setSelectedStacks((prev) => prev.filter((item) => stack !== item));
  };

  // 요소 외불 누르면 기술선택하는 창 닫히는 로직 구현
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
    <div className="flex flex-col gap-4">
      <b>필요 기술 스택</b>

      <div ref={rootRef} className="relative">
        <input
          type="text"
          value={search}
          onClick={() => setOpen(true)}
          onChange={handleChangeSearch}
          placeholder="기술 스택을 검색해주세요"
          className="w-full rounded-xl py-3 px-5 box-border border border-main outline-0"
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
              const icon = (icons as any)[item.iconName];
              if (!icon) return null;
              const selected = selectedStacks.find(
                (stack) => stack.eng === item.eng,
              );
              console.log(item.kor, " : ", selected);
              return (
                <li
                  key={`TechStacks-${item.eng}`}
                  value={item.eng}
                  onClick={() => {
                    if (!selected) handleAddStack(item);
                  }}
                  className={`px-3 py-2 rounded-lg ${selected ? "cursor-not-allowed text-gray-400" : "hover:bg-selected cursor-pointer"}`}
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
          const icon = (icons as any)[item.iconName];
          if (!icon) return null;
          return (
            <SelectedTech
              key={`SelectedTechStack-${item.eng}`}
              icon={icon}
              onClick={() => handleDelteStack(item)}
            />
          );
        })}
      </div>
    </div>
  );
}
