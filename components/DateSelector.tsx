"use client";
import React from "react";

export default function DateSelector({
  value,
  onChange,
  errors,
}: {
  value: string | null; // ex) "2000-02-20" 또는 null/부분값
  onChange: (result: string | null) => void;
  errors?: string[];
}) {
  // value를 파싱해서 바로 렌더링에 사용
  const [yy, mm, dd] = (value ?? "").split("-");
  const year = yy ?? "";
  const month = mm ?? "";
  const day = dd ?? "";

  const onlyDigits = (s: string) => s.replace(/\D/g, "");
  const pad2 = (n: number) => String(n).padStart(2, "0");
  const clamp = (n: number, min: number, max: number) =>
    Math.min(max, Math.max(min, n));
  const daysInMonth = (y: number, m: number) => new Date(y, m, 0).getDate();

  const update = (y: string, m: string, d: string) => {
    if (y === "" && m === "" && d === "") onChange(null);
    else onChange(`${y}-${m}-${d}`);
  };

  const handleChange = (type: "year" | "month" | "day") => (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = onlyDigits(e.target.value);
    if (type === "year") update(v.slice(0, 4), month, day);
    if (type === "month") update(year, v.slice(0, 2), day);
    if (type === "day") update(year, month, v.slice(0, 2));
  };

  // blur 시 월/일 보정 + 2자리 패딩
  const handleBlur = (type: "month" | "day") => () => {
    if (type === "month" && month) {
      let m = clamp(parseInt(month, 10) || 1, 1, 12);
      const y = year.length === 4 ? parseInt(year, 10) : 2000;
      let d = day ? clamp(parseInt(day, 10) || 1, 1, daysInMonth(y, m)) : null;
      update(year, pad2(m), d !== null ? pad2(d) : "");
    }
    if (type === "day" && day) {
      const y = year.length === 4 ? parseInt(year, 10) : 2000;
      const m = clamp(parseInt(month || "1", 10) || 1, 1, 12);
      let d = clamp(parseInt(day, 10) || 1, 1, daysInMonth(y, m));
      update(year, month ? pad2(m) : month, pad2(d));
    }
  };

  const inputCls = "w-[3.5ch] text-end bg-transparent outline-none border-none ring-0 focus:outline-none focus:ring-0 focus:border-none";

  return (
    <div className="flex flex-col gap-1">
      <div
        className={`flex items-center gap-2 w-full rounded-xl px-5 py-3 box-border border ${errors ? "border-red-500" : "border-mtm-light-gray hover:border-mtm-main-blue focus-within:border-mtm-main-blue"}`}>
        <input
          inputMode="numeric"
          pattern="\d*"
          size={4}
          maxLength={4}
          placeholder="YYYY"
          value={year}
          onChange={handleChange("year")}
          className={inputCls.replace("w-[3.5ch]", "w-[4.5ch]")}
        />
        <span>년 /</span>

        <input
          inputMode="numeric"
          pattern="\d*"
          size={2}
          maxLength={2}
          placeholder="MM"
          value={month}
          onChange={handleChange("month")}
          onBlur={handleBlur("month")}
          className={inputCls}
        />
        <span>월 /</span>

        <input
          inputMode="numeric"
          pattern="\d*"
          size={2}
          maxLength={2}
          placeholder="DD"
          value={day}
          onChange={handleChange("day")}
          onBlur={handleBlur("day")}
          className={inputCls}
        />
        <span>일</span>
      </div>
      {errors && <span className="text-red-500 text-sm">{errors[0]}</span>}
    </div>
  );
}
