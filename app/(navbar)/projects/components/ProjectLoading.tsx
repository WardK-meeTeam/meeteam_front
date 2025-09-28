import { sortOptions } from "@/constants/projectOptions";
import CardSkeletonGroup from "./CardSkeletonGroup";
import CircleSpinner from "./CircleSpinner";
import ProjectSortBar from "./ProjectSortBar";

export default function ProjectLoading({ count = 8 }: { count?: number }) {
  return (
    <>
      <ProjectSortBar sortOptions={sortOptions} totalElements={0} />
      <CardSkeletonGroup count={count} />
      <div className="flex flex-col gap-2 items-center py-8">
        <CircleSpinner />
      </div>
    </>
  );
}