import { sortOptions } from "@/constants/projectOptions";
import ProjectCardSkeleton from "./ProjectCardSkeleton";
import CircleSpinner from "../../../../components/CircleSpinner";
import ProjectSortBar from "./ProjectSortBar";

export default function ProjectListLoading({ count = 8, sortBar = false }: { count?: number, sortBar?: boolean }) {
  return (
    <>
      {sortBar && <ProjectSortBar sortOptions={sortOptions} totalElements={0} />}
      <div className="grid grid-cols-4 gap-8">
        {
          Array(count).fill(0).map((_, idx) => (
            <ProjectCardSkeleton key={`project-skeleton-${idx}`} />
          ))
        }
      </div>
      
      <div className="flex flex-col gap-2 items-center py-8">
        <CircleSpinner />
      </div>
    </>
  );
}