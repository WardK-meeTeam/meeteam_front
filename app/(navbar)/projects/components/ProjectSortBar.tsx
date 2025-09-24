import QuerySyncSelect from "./QuerySyncSelect";
import { Option } from "../page";

export default function ProjectSortBar({ sortOptions }: { sortOptions: Option[] }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="text-black">
        24개
      </div>
      <div className="flex w-36">
        <QuerySyncSelect
          options={sortOptions}
          paramKey="sort"
          placeholder="정렬"
        />
      </div>
    </div>
  );
}