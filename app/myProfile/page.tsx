"use client";

export default function myPofile() {

    const partGroups = [
        ["디자인", "uiux디자인"], 
        ["디자인", "3d 그래픽"], 
        ["프론트엔드", "웹 프론트엔드"]
    ];

    const stacksImg = ["/images/Ps.png", "/images/Figma.png", "/images/Ps.png"];

    return (
        <div className="flex justify-center items-center">
            {/*왼쪽 정보 */}
            <aside className="border flex flex-col gap-y-12">
                <div className="flex flex-col gap-y-5 items-center">
                    <img 
                    src="/images/userImg1.png"
                    className="w-[194px] h-[194px] rounded-[50%]"
                    />
                    <div className="flex justify-center items-center gap-x-4">
                        <div className="text-[36px] font-extrabold">김성림</div>
                        <div className="text-[14px] text-[#AD5FFF]">정보 수정하기</div>
                    </div>
                    <div className="w-[148px] h-[45px] rounded-[8px] bg-[#FFF3F0] text-[16px] flex justify-center items-center text-[#FF4802] font-bold">
                        협업온도 98'
                    </div>
                </div>

                <div className="flex justify-center items-between gap-x-9 mt-5">
                    <div className="flex flex-col gap-y-3">
                        <div className="text-[16px] font-bold">나이</div>
                        <div className="text-[16px] font-bold">성별</div>
                        <div className="text-[16px] font-bold">이메일</div>
                        <div className="text-[16px] font-bold">분야</div>
                    </div>
                    <div className="flex flex-col gap-y-3 text-[16px] text-[#474747]">
                        <div className="text-[16px]">22세</div>
                        <div className="text-[16px]">여성</div>
                        <div className="text-[16px] flex items-center">volunteer.24@gmail.com</div>
                        <div className="flex flex-col">
                            {partGroups.map(([left, right], idx) => (
                                <div key={idx} className="flex gap-x-2">
                                    <span className="after:content-[','] last:after:content-['']">{left}</span>
                                    <span className="after:content-[','] last:after:content-['']">{right}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-y-3">
                    <div className="text-[16px] font-bold">기술 스택</div>
                    <div className="flex gap-x-3">
                        {stacksImg.map((stack, idx) => (
                            <img key={idx} src={stack} className="w-[40px] h-[40px] rounded-[50%]"/>
                        ))}
                    </div>
                    <div className="flex gap-x-3 mt-7">
                        <div className="text-[16px] font-bold">프로젝트 참여 여부</div>
                        <div>toggle btn</div>
                    </div>
                    <div className="flex gap-x-3 mt-5">
                        <div className="text-[16px] font-bold">프로젝트 참여 수</div>
                        <div className="text-[16px] font-bold">5개</div>
                    </div>
                    <div className="flex gap-x-3">
                        <div className="text-[16px] font-bold">리뷰 개수</div>
                        <div className="text-[16px] font-bold">4개</div>
                    </div>
                </div>
            </aside>

            {/*메인 정보 부분 */}
            <main className="border"></main>
        </div>
    )
};