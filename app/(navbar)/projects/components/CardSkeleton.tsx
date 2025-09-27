export default function CardSkeleton() {
  return (
    <div className="m-3 w-[305px] h-[415px]">
      <div className="w-full h-full rounded-[16px] animate-pulse" style={{ animationDuration: '1.5s' }}>
        <div className="w-full h-full rounded-[16px] bg-gradient-to-b from-black/5 to-black/10 flex flex-col justify-between p-6">
          {/* 상단 영역 */}
          <div>
            <div className="flex justify-between items-center">
              <div className="w-[104px] h-[25px] bg-black/5 rounded-[16px]" />
              <div className="w-20 h-[14px] bg-black/5 rounded" />
            </div>

            <div className="flex gap-2 items-center mt-4">
              <div className="flex gap-1">
                {[1, 2, 3].map((_, idx) => (
                  <div
                    key={idx}
                    className="w-[23px] h-[23px] bg-black/5 rounded-[4px]"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 하단 영역 */}
          <div className="flex flex-col items-center">
            <div className="w-[212px] h-[40px] bg-black/5 rounded mb-4" />
            
            <div className="flex gap-2 items-center mb-4">
              <div className="w-10 h-3 rounded bg-black/5" />
              <div className="w-16 h-3 rounded bg-black/5" />
            </div>

            <div className="flex flex-col items-center w-full">
              <div className="flex justify-end items-center gap-1 w-[230px] mb-2">
                <div className="w-8 h-3 rounded bg-black/5" />
                <div className="w-6 h-3 rounded bg-black/5" />
              </div>
              <div className="w-[230px] h-[5px] bg-black/5 rounded-[30px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}