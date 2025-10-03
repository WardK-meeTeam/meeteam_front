"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { projectCategoryOptions } from "@/constants/projectOptions";
import { useMemo, useEffect, useRef, useState } from "react";

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

    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
    const labelRefs = useRef<Record<string, HTMLSpanElement | null>>({});
    const [underline, setUnderline] = useState<{ left: number; width: number }>({ left: 0, width: 0 });

    useEffect(() => {
        const update = () => {
            const btn = buttonRefs.current[selected.value];
            const lbl = labelRefs.current[selected.value];
            const container = containerRef.current;
            if (!btn || !lbl || !container) return;
            const containerLeft = container.getBoundingClientRect().left;
            const labelRect = lbl.getBoundingClientRect();
           
            const vw = window.innerWidth;
            const n = vw >= 1280 ? 2 : vw >= 1024 ? 1 : 0; 
            const left = labelRect.left - containerLeft - n; 
            const width = Math.ceil(labelRect.width);
            setUnderline({ left, width });
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, [selected.value]);

    return (
        <div className="flex relative flex-col">
            {/**회색 바 */}
            <div className="w-full h-[1.7px] absolute bottom-0 bg-[#E8E8E8]"></div>
            {/**파란색 바 */}
            <div
                className="absolute bottom-0 h-[1.7px] bg-[#6BB4FF] pointer-events-none"
                style={{ left: underline.left, width: underline.width }}
            />
            <div ref={containerRef} className="flex gap-x-7 justify-start items-center px-5 pt-5 pb-1">
                {categories.map(({value, label}) => {
                    const isSelected = selected.value === value;
                    return (
                    <button
                    key={value}
                    type="button"
                    ref={(el) => { buttonRefs.current[value] = el; }}
                    onClick={() => onSelect(value)}
                    className="relative inline-flex items-center font-semibold cursor-pointer select-none pb-1 border-b-[1.7px] border-transparent"
                    >
                        <span
                            ref={(el) => { labelRefs.current[value] = el; }}
                            className={`text-[18px] ${isSelected ? "text-black" : "text-[#A5A5A5]"} ml-2`}
                        >
                            {label}
                        </span>
                    </button>
                    );
                })}
            </div>
        </div>
    )
}