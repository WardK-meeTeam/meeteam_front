"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { projectCategoryOptions } from "@/constants/projectOptions";
import { useMemo } from "react";

export default function HomeCategoryTabs() {

    const router = useRouter();
    const searchParams  = useSearchParams();
    const pathname = usePathname();

    const categories = projectCategoryOptions.filter(opt => opt.value !== "");

    const currentValue = searchParams.get("category") ?? "ENVIRONMENT";
    const selected = useMemo(
        () => categories.find((c) => c.value === currentValue) ?? categories[0],
        [categories, currentValue]
    );

    const onSelect = (value: string) => {
        const sp = new URLSearchParams(searchParams);
        sp.set("category", value);
        router.push(`${pathname}?${sp.toString()}`, {scroll: false});
    };

    return (
        <div className="flex relative flex-col">
            {/**회색 바 */}
            <div className="w-full h-[1.7px] absolute bottom-0 bg-[#E8E8E8] mt-2"></div>
            <div className="flex gap-x-7 justify-start items-center px-5 py-5">
                {categories.map(({value, label}) => {
                    const isSelected = selected.value === value;
                    return (
                    <button
                    key={value}
                    type="button"
                    onClick={() => onSelect(value)}
                    className="relative w-auto flex flex-col items-center font-semibold cursor-pointer select-none"
                    >
                        <span className={`text-[18px] ${isSelected ? "text-black" : "text-[#A5A5A5]"} ml-2`}>
                            {label}
                        </span>
                                    
                        {/* 파란색 바*/}
                        {isSelected && (
                            <div
                            style={{ width: `${label.length * 18}px` }}
                            className="h-[1.7px] bg-[#6BB4FF] absolute top-9 mt-2"
                            />
                        )}
                    </button>
                    );
                })}
            </div>
        </div>
    )
}