"use client";

import { useState } from "react";

export default function DateSelector() {
  const [year, setYear] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "year" | "month" | "date",
  ) => {
    const value = e.target.value;
    console.log(e);
    if (type === "year") setYear(value);
    else if (type === "month") setMonth(value);
    else if (type === "date") setDate(value);
  };
  return (
    <div className="flex flex-row w-full rounded-xl px-5 py-3 box-border border border-mtm-light-gray hover:border-mtm-main-blue focus:border-mtm-main-blue">
      <span className="flex flex-row gap-2">
        <input
          size={4}
          maxLength={4}
          placeholder="YYYY"
          value={year}
          onChange={(e) => handleChange(e, "year")}
          type="text"
          className="outline-0 text-end"
        />
        <span>년</span>
        <span className="mr-2">/</span>
      </span>
      <span className="flex flex-row gap-2">
        <input
          size={3}
          maxLength={2}
          placeholder="MM"
          value={month}
          onChange={(e) => handleChange(e, "month")}
          type="text"
          className="outline-0 text-end"
        />
        <span>월</span>
        <span className="mr-2">/</span>
      </span>
      <span className="flex flex-row gap-2">
        <input
          size={3}
          maxLength={2}
          value={date}
          onChange={(e) => handleChange(e, "date")}
          placeholder="DD"
          type="text"
          className="outline-0 text-end"
        />
        일
      </span>
    </div>
  );
}
