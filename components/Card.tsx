"use client";

interface CardProps {
    category : string;
}

const CardBgImgs : {[key: string] : string} = {
    Beauty: "/images/Beauty.png",          
    Eco: "/images/Eco.png",
    Education: "/images/Education.png",
    Pet: "/images/Pet.png",
    Productivity: "/images/Productivity.png",
  };
  

export default function Card( {category} : CardProps) {
    const bgImg = CardBgImgs[category] || "/images/Beauty.png";

    return (
        <div className="m-10 w-[305px] h-[415px]">

            {/*카드 앞면*/}
            <div 
            className="w-full h-full border border-2 rounded-[16px] flex flex-col justify-between overflow-hidden bg-cover bg-center relative"
            style={ {backgroundImage: `url(${bgImg})`}}
            >
                    
                {/*위쪽*/}
                <div>
                    <div className="flex items-center justify-between mx-6 mt-6">
                        <div className="w-[104px] h-[25px] border border-none rounded-[16px] bg-[#FFEAE8] text-[14px] font-semibold text-[#EE7366] flex justify-center items-center">BreathMate</div>
                        <div className="text-[14px] font-400">2025.06.01</div>
                    </div>
                    
                    <div className="flex items-center justify-start gap-x-2 px-6 mt-4">
                        <div className="flex gap-x-1">
                            {[1,2,3].map((idx) => (
                                <img
                                key={idx}
                                className="w-[23px] h-[23px] border border-1 rounded-[4px]"
                                src="/"
                                alt="tool"
                                />
                            ))}
                        </div>
                        <div className="text-[12px] font-bold flex justify-center items-center">+2</div>
                    </div>
                </div>

                {/*아래쪽*/}
                <div className="m-6 flex flex-col items-center justify-center">
                    <div className="text-[20px] w-[212px] h-[52px] flex items-center justify-center">스마트 호흡 트레커를 통한 천식 모니터링 앱</div>
                    <div className="flex items-center justify-between gap-x-2 text-[12px] m-4">
                        <div className="font-semibold">팀장</div>                            <div className="font-normal">김도윤</div>
                    </div>
                    <div>
                        <div className="flex justify-end items-center gap-x-1">
                            <div className="text-[14px] font-medium">70%</div>
                            <div className="text-[12px] font-normal">진행</div>
                        </div>
                        <div className="w-[230px] h-[5px] border border-none rounded-[30px] bg-[#E0E0E0]"></div>
                    </div>
                </div>
            </div>

            {/*카드 뒷면*/}
        
        </div>
    )
}