export default function UserCardSkeleton() {
  return (
    <div className="w-[305px] h-[239px] bg-[#F5F7F9] rounded-[16px] flex-none animate-pulse" style={{ animationDuration: '1.5s' }}>
      {/* 위칸 */}
      <div className="flex gap-x-6 justify-start items-center p-5">
        <div className="flex flex-col gap-y-2 justify-center items-center">
          <div className="w-[63px] h-[63px] bg-black/10 rounded-full" />
          <div className="w-12 h-3 rounded bg-black/10" />
        </div>
        <div className="flex flex-col gap-y-2 justify-center items-start">
          <div className="flex gap-x-2 items-center">
            <div className="w-16 h-3 rounded bg-black/10" />
            <div className="w-8 h-3 rounded bg-black/10" />
          </div>
          <div className="flex gap-x-2 items-center">
            <div className="w-24 h-3 rounded bg-black/10" />
            <div className="w-6 h-3 rounded bg-black/10" />
          </div>
        </div>
      </div>

      {/* 아래칸 */}
      <div className="px-5">
        <div className="w-full h-20 rounded bg-black/10" />
      </div>
    </div>
  );
}