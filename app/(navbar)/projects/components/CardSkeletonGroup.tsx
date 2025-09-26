import CardSkeleton from "./CardSkeleton";

export default function CardSkeletonGroup({count}: {count: number}) {
  return (
    <div className="grid grid-cols-4 gap-8">
      {Array(count).fill(0).map((_, idx) => (
        <CardSkeleton key={`project-skeleton-${idx}`} />
      ))}
    </div>
  );
}