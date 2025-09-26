import CardSkeleton from "./CardSkeleton";

export default function CardSkeletonGroup({count}: {count: number}) {
  return (
    <div className="grid grid-cols-4 gap-0">
      {Array(count).fill(0).map((idx) => (
        <CardSkeleton key={idx} />
      ))}
    </div>
  );
}