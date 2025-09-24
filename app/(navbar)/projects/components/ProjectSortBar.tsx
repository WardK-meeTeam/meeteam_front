"use client";

import QuerySyncSelect from "./QuerySyncSelect";
import { Option } from "@/constants/projectOption";

const sortOptions: Option[] = [
  { value: "desc", label: "최신순" },
  { value: "asc", label: "오래된순" },
];

export default function ProjectSortBar() {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="text-gray-500">
        24개
      </div>
      <div className="w-32">
        <QuerySyncSelect
          options={sortOptions}
          paramKey="sort"
          placeholder="정렬"
          variant="listControl"
        />
      </div>
    </div>
  );
}