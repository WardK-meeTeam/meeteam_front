"use client";

export default function TeamRecruitCard () {
    return (
        <div className="w-[305px] h-[239px] bg-[#F5F7F9] rounded-[16px]">
            
            {/* 위칸 */}
            <div className="flex justify-left items-center p-5 gap-x-6">
                <div className="flex flex-col justify-center items-center gap-y-2">
                    <div className="w-[63px] h-[63px] border border-1 rounded-[50%]"></div>
                    <div className="text-[12px] font-bold">김도윤</div>
                </div>
                <div className="flex flex-col justify-center items-left">
                    <div className="flex items-center gap-x-2">
                        <div className="text-[14px] font-bold">협업온도</div>
                        <div>45°</div>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <div className="text-[14px] font-bold">사이드 프로젝트</div>
                        <div>9회</div>
                    </div>
                </div>
            </div>

            {/* 아래칸 */}
            <div className="flex flex-col px-5">
                <div className="text-[14px] font-bold text-[#C48DFF]">Skill</div>
                <div className="flex gap-x-3">
                    <div className="flex flex-col justify-center items-left">
                        <div className="text-[14px]">Adobe Illustrator</div>
                        <div className="text-[14px]">Adobe Photoshop</div>
                        <div className="text-[14px]">Figma</div>
                    </div>
                    <div className="flex flex-col justify-center items-left gap-y-5">
                        <div className="w-[108px] h-[5px] rounded-[30px] bg-white">
                            <div className="h-full w-[40%] rounded-[30px] bg-[#C48DFF]"></div>
                        </div>
                        <div className="w-[108px] h-[5px] rounded-[30px] bg-white">
                            <div className="h-full w-[80%] rounded-[30px] bg-[#C48DFF]"></div>
                        </div>
                        <div className="w-[108px] h-[5px] rounded-[30px] bg-white">
                            <div className="h-full w-[40%] rounded-[30px] bg-[#C48DFF]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};