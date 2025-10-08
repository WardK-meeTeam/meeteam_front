import QuerySyncSelect from "@/app/(navbar)/projects/components/QuerySyncSelect";
import { Option } from "@/constants/projectOptions";

// 사용자 정렬 옵션
const userSortOptions: Option[] = [
  // { value: "projectCount,desc", label: "프로젝트 많은 순" },
  { value: "temperature,desc", label: "온도 높은 순" }, //default
  // { value: "projectCount,asc", label: "프로젝트 적은 순" },
  { value: "temperature,asc", label: "온도 낮은 순" },
];

export default function UserSortBar({ totalElements }: { totalElements: number }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="text-black">
        총 {totalElements}개
      </div>
      <div className="flex w-50">
        <QuerySyncSelect
          options={userSortOptions}
          paramKey="sort"
          placeholder="정렬"
          variant="listControl"
        />
      </div>
    </div>
  );
}