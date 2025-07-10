"use client";

export default function SettingAfterSignup() {

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
                <div className="border border-2 border-black flex flex-col justify-center items-start m-10 w-[330px]">
                    <div className="flex flex-col p-3">
                        <span className="text-[15px] font-semibold">직무 선택</span>
                        <span className="text-[12px] font-normal text-[#757575]">중복 선택이 가능합니다.</span>
                    </div>
                    <div className="flex">
                        <div className="m-2 w-[102px] h-[40px] border border-[0.91px] border-[#D9D9D9] rounded-[25px] flex justify-center items-center text-[14px]">디자이너</div>
                        <div className="m-2 w-[102px] h-[40px] border border-[0.91px] border-[#D9D9D9] rounded-[25px] flex justify-center items-center text-[14px]">프론트</div>
                        <div className="m-2 w-[102px] h-[40px] border border-[0.91px] border-[#D9D9D9] rounded-[25px] flex justify-center items-center text-[14px]">백엔드</div>
                    </div>
                    <div className="flex">
                        <div className="m-2 w-[102px] h-[40px] border border-[0.91px] border-[#D9D9D9] rounded-[25px] flex justify-center items-center text-[14px]">PM</div>
                        <div className="m-2 w-[102px] h-[40px] border border-[0.91px] border-[#D9D9D9] rounded-[25px] flex justify-center items-center text-[14px]">APP</div>
                        <div className="m-2 w-[102px] h-[40px] border border-[0.91px] border-[#D9D9D9] rounded-[25px] flex justify-center items-center text-[14px]">WEB</div>
                    </div>
                </div>

                {/*프로필 사진*/}
                <div className="border border-2 border-black flex flex-col w-[330px] justify-center items-start">
                    <div className="flex flex-col p-3">
                        <span className="text-[15px] font-semibold">프로필 사진</span>
                        <span className="text-[12px] font-normal text-[#757575]">10MB 이내의 이미지 파일을 업로드 해주세요.</span>
                    </div>
                    <div className="flex justify-center items-center gap-x-7">
                        <div className="w-[87px] h-[87px] border border-none rounded-[50%] bg-[#F8F8F9]" ></div>
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