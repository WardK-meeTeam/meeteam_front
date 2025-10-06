export default function UserCardSkeleton() {
  return (
    <div className="w-[305px] bg-[#F5F7F9] rounded-[16px] flex-none pt-6 pb-8 px-6 animate-pulse" style={{ animationDuration: '1.5s' }}>
      {/* 위칸 */}
      <div className="flex gap-x-6 justify-start items-center mb-5">
        <div className="flex flex-col gap-y-2 justify-center items-center">
          <div className="w-[63px] h-[63px] bg-black/5 rounded-full" />
          <div className="w-12 h-3 rounded bg-black/5" />
        </div>
        <div className="flex flex-col gap-y-2 justify-center items-start">
          <div className="flex gap-x-2 items-center">
            <div className="w-16 h-3 rounded bg-black/5" />
            <div className="w-8 h-3 rounded bg-black/5" />
          </div>
          <div className="flex gap-x-2 items-center">
            <div className="w-24 h-3 rounded bg-black/5" />
            <div className="w-6 h-3 rounded bg-black/5" />
          </div>
        </div>
      </div>

      {/* 아래칸 */}
      <div className="flex items-center">
        <span className="mr-6 w-16 h-3 rounded bg-black/5" />
        <div className="flex gap-1">
          <div className="w-10 h-10 rounded bg-black/5" />
          <div className="w-10 h-10 rounded bg-black/5" />
          <div className="w-10 h-10 rounded bg-black/5" />
        </div>
      </div>
    </div>
  );
}

