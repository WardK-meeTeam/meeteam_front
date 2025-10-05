import QuerySyncSelect from "./QuerySyncSelect";
import { Option } from "@/constants/projectOptions";

export default function ProjectSortBar({ sortOptions, totalElements, showSort = true, showCount = true }: { sortOptions: Option[], totalElements: number, showSort?: boolean, showCount?: boolean }) {
  return (
    <div className="flex justify-between items-center mb-6">
      {showCount ? (
        <div className="text-black">
          총 {totalElements}개
        </div>
      ) : <div />}
      {showSort && (
        <div className="flex w-32">
          <QuerySyncSelect
            options={sortOptions}
            paramKey="sort"
            placeholder="정렬"
            variant="listControl"
          />
        </div>
      )}
    </div>
  );
}