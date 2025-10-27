import CircleSpinner from "@/components/CircleSpinner";
import UserCardSkeleton from "./UserCardSkeleton";
import UserSortBar from "./UserSortBar";

export default function UserLoading({ count = 8, sortBar = true }: { count?: number, sortBar?: boolean }) {
  return (
    <>
      {sortBar && <UserSortBar totalElements={0} />}
      <div className="grid grid-cols-4 gap-8">
        {
          Array(count).fill(0).map((_, idx) => (
            <UserCardSkeleton key={`user-skeleton-${idx}`} />
          ))
        }
      </div>
      <div className="flex flex-col gap-2 items-center py-8">
        <CircleSpinner />
      </div>
    </>
  );
}