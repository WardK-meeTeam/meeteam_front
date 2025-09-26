import CardSkeletonGroup from "./CardSkeletonGroup";
import CircleSpinner from "./CircleSpinner";

export default function ProjectLoading({ count = 8 }: { count?: number }) {
  return (
    <>
      <CardSkeletonGroup count={count} />
      <div className="flex flex-col gap-2 items-center py-8">
        <CircleSpinner />
      </div>
    </>
  );
}