'use client';
import { useState } from "react";

export default function SettingAfterSignup() {

    const [selectedPart, setSelectedPart] = useState<string[]>([]);

    const togglePart = (part : string) => {
        setSelectedPart((prev) =>
            prev.includes(part) ? prev.filter((p) => p!==part) : [...prev, part] 
        );
    };

    const partGroups = [
        ['디자이너', '프론트', '백엔드'],
        ['PM', 'APP', 'WEB']
    ];

    return (
        <main className="">
            <div className="border border-2 border-black flex flex-col justify-center items-center h-screen">

                {/*logo*/}
                <div>
                    <h1 className="text-[24px] text-[#6BB4FF] font-bold">
                        Meeteam
                    </h1>
                </div>

                {/*직무 선택*/}
                <div className="flex flex-col justify-between items-start mt-10 w-[330px]">
                <div className="flex flex-col p-3">
                        <span className="text-[15px] font-semibold">직무 선택</span>
                        <span className="text-[12px] font-normal text-[#757575]">중복 선택이 가능합니다.</span>
                </div>
                {partGroups.map((group, idx) => (
                    <div key={idx} className="w-[100%] flex justify-between items-center py-2">
                        {group.map((part) => (
                            <button
                            key={part}
                            type="button"
                            onClick={() => togglePart(part)}
                            className={`w-[102px] h-[40px] border border-[0.91px] rounded-[25px] flex justify-center items-center text-[14px] cursor-pointer
                                ${
                                    selectedPart.includes(part)
                                      ? 'bg-[rgba(128,191,255,0.14)] border-[#6BB4FF]'
                                      : 'border-[#D9D9D9]'
                                  }
                                  hover:bg-[rgba(128,191,255,0.14)] hover:border-[#6BB4FF]
                                `}
                                >
                                    {part}
                                </button>
                        ))}
                    </div>
                ))}
                </div>
                

                {/*프로필 사진*/}
                <div className="border border-2 border-black flex flex-col justify-between items-start m-10 w-[330px]">
                    <div className="flex flex-col p-3">
                        <span className="text-[15px] font-semibold">프로필 사진</span>
                        <span className="text-[12px] font-normal text-[#757575]">10MB 이내의 이미지 파일을 업로드 해주세요.</span>
                    </div>
                    <div className="flex justify-center items-center gap-x-7">
                        <div className="w-[87px] h-[87px] border border-none rounded-[50%] bg-[#F8F8F8]" ></div>
                        <div className="w-[148px] h-[35px] border border-[#D9D9D9] rounded-[22px] flex justify-center items-center">
                            <span></span>
                            <span className="text-[12.63px]">프로필 사진 업로드</span>
                        </div>
                    </div>
                </div>

                {/*확인버튼*/}
                <div className="w-[330px] h-[44px] border border-none rounded-[7.89px] bg-[#6BB4FF] flex justify-center items-center text-[12.63px] text-[#FFFFFF]">확인</div>

            </div>
            
        </main>
    )
}