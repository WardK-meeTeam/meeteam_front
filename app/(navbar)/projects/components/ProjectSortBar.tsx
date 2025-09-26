import QuerySyncSelect from "./QuerySyncSelect";
import { Option } from "@/constants/projectOptions";

export default function ProjectSortBar({ sortOptions }: { sortOptions: Option[] }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="text-black">
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