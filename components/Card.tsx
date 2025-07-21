"use client";

interface CardProps {
    category : string;
    tool: string;
    teamName: string;
    date: string;
    tools: string[];
    title: string;
    leader: string;
    progress : number;
    teamSize : number;
    userImg : string[];
    deadDate: string;
    passionLevel: number;
};

const CardBgImgs : {[key: string] : string} = {
    Beauty: "/images/Beauty.png",          
    Eco: "/images/Eco.png",
    Education: "/images/Education.png",
    Pet: "/images/Pet.png",
    Productivity: "/images/Productivity.png",
    Healthcare: "/images/HealthCare.png"
  };

const ToolImgs : { [key: string] : string} = {
    Ai: "/images/Ai.png",
    Figma: "/images/Figma.png",
    Ps: "/images/Ps.png"
};

// 순서대로 [textColor, boxColor, (gradient colors 3개)]
const CategoryColors : { [key: string] : [string, string, string, string] } = {
    Beauty: ["#DB6893", "#FFF0F9", "#F3D8E6", "#F2CAD2"],          
    Eco: ["#71B04E", "#E5FFD6", "#AAEBE0", "#CBE8BA"],
    Education: ["#A27DC2", "#F5E9FF", "#C7C9EE", "#DDCCEA"],
    Pet: ["#F1A800", "#FFFCE9", "#F4D2BD", "#F4EDBF"],
    Productivity: ["#3A84BC", "#D9FBFF", "#CCDEFF", "#B5E7ED"],
    Healthcare: ["#EE7366", "#FFEAE8", "#FFCAC1", "#F7E2DC"],
};
  

export default function Card( {category, tool, tools, teamName, date, title, leader, progress, teamSize, userImg, deadDate, passionLevel} : CardProps) {

    return (
        
        <div className="m-3 w-[305px] h-[415px]">

            <div>
                
                {/*카드 앞면*/}
                <div 
                className="w-full h-[415px] full rounded-[16px] flex flex-col justify-between overflow-hidden bg-cover bg-center relative"
                style={ {backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 2%, rgba(0, 0, 0, 0.8) 83%), url(${CardBgImgs[category] || "/images/HealthCare.png"})`}}
                >
                    
                    {/*위쪽*/}
                    <div>
                        <div className="flex items-center justify-between mx-6 mt-6">
                            <div 
                            className="w-[104px] h-[25px] border border-none rounded-[16px] text-[14px] font-semibold text-[#EE7366] flex justify-center items-center"
                            style={ {color: `${CategoryColors[category]?.[0] || "#EE7366"}`, backgroundColor: `${CategoryColors[category]?.[1] || "#FFEAE8"}`}}
                            >
                                {teamName || "BreathMate"} 
                                
                            </div>
                            <div className="text-[14px] font-normal text-white">{date}</div>
                        </div>
                    
                        <div className="flex items-center justify-start gap-x-2 px-6 mt-4">
                            <div className="flex gap-x-1">
                                {[1,2,3].map((tool, idx) => (
                                    <img
                                    key={idx}
                                    className="w-[23px] h-[23px] rounded-[4px]"
                                    src={ToolImgs[tool] || "/images/Figma.png"}
                                    alt="tool"
                                    />
                                ))}
                            </div>
                            <div className="text-[12px] font-bold flex justify-center items text-white">+2</div>
                        </div>
                    </div>

                    {/*아래쪽*/}
                    <div className="m-5 flex flex-col items-center justify-center">
                        <div className="w-[212px] text-[20px] font-bold text-white text-center leading-tight break-words">
                            {title || "스마트 호흡 트레커를 통한 천식 모니터링 앱"}
                        </div>
                        <div className="flex items-center justify-between gap-x-2 text-[12px] m-4 text-white">
                            <div className="font-semibold">팀장</div>                            
                            <div className="font-normal">{leader || "김도윤"}</div>
                        </div>
                        <div>
                            <div className="flex justify-end items-center gap-x-1 text-white mb-2">
                                <div className="text-[14px] font-medium ">{progress || 70}%</div>
                                <div className="text-[12px] font-normal">진행</div>
                            </div>
                            <div className="w-[230px] h-[5px] border border-none rounded-[30px] bg-[#E0E0E0] mb-1.5">
                                <div
                                className="h-full rounded-[30px]"
                                style={{width: `${progress || 70}%`, backgroundColor: `${CategoryColors[category]?.[0] || "#EE7366"}`}}
                                ></div>
                            </div>
                        </div>
                     </div>
                </div>

                {/*카드 뒷면*/}
                <div 
                className="w-full h-[415px] mt-5 rounded-[16px] flex flex-col items-center relative"
                style={{
                    backgroundImage: `linear-gradient(143deg,
                      ${CategoryColors[category][2]} 0%,
                      ${CategoryColors[category][2]} 30%,
                      #FFFFFF 49.75%,
                      #FFFFFF 50.25%,
                      ${CategoryColors[category][3]} 70%,
                      ${CategoryColors[category][3]} 100%)`
                  }}
                >
                
                    <div 
                    className="w-[92px] h-[25px] text-[14px] font-semibold border border-none rounded-[13px] flex items-center justify-center m-6"
                    style={{color: `${CategoryColors[category]?.[0] || "#EE7366"}`, backgroundColor: `${CategoryColors[category]?.[1] || "#FFEAE8"}`}}
                    >{teamName}
                    </div>

                    <div className="flex gap-x-2 mt-5">
                        <div className="text-[16px] font-medium text-[#757575]">팀원</div>
                        <div className="text-[16px] font-semibold" 
                        style={{color: `${CategoryColors[category]?.[0] || "#EE7366"}`}}
                        >{teamSize || 0}명</div>
                    </div>
                
                    <div className="flex flex-col my-3 gap-y-2">
                        <div className="flex justify-center items-center gap-x-2">
                            {userImg.slice(0,4).map((img, idx) => (
                                <img
                                key={idx}
                                className="w-[56px] h-[56px] rounded-full object-cover" 
                                src={img}
                                alt={`user-${idx}`}
                                />
                            ))}
                        </div>
                        <div className="flex justify-center items-center gap-x-2">
                            {userImg.slice(4, 7).map((img, idx) => (
                                <img
                                key={idx}
                                className="w-[56px] h-[56px] rounded-full object-cover" 
                                src={img}
                                alt={`user-${idx}`}
                                />
                            ))}
                        </div>
                        <div className="absolute text-[12px] font-medium"
                            style={ {
                                top: "214px",
                                left: "252px",
                               color: `${CategoryColors[category][0]}`,
                            }}
                            >
                                +{teamSize-userImg.length}
                           </div>
                        </div>
   
                        <div className="w-[243px] border border-1 border-[#D9D9D9] my-5"></div>
  
                        <div className="flex gap-x-2 mt-3">
                            <div className="text-[16px] font-bold text-[#757575]">목표 기간</div>
                            <div className="text-[16px] font-medium text-[#757575]">{deadDate}</div>
                        </div>
                        <div className="flex gap-x-2 my-2">
                            <div className="text-[16px] font-bold text-[#757575]">열정 레벨</div>
                            <div className="text-[16px] font-medium text-[#757575]">LV. {passionLevel}</div>
                        </div>
                    </div>

                </div>
        
            </div>
    )
}