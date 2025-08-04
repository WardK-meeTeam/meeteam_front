"use client";

import { useState } from "react";
import { RiArrowDownWideFill } from "react-icons/ri";

export default function BasicInfoPopup() {

    const allStacks = ["React", "Flutter", "Python"];
    const [searchStack, setSearchStack] = useState("");

    const [selectedStack, setSelectedStack] = useState<string[]>([]);

    const stackImgs =[
       { name : "React", img: "/images/react.png"},
       { name: "Flutter", img: "/images/flutter.png" },
       { name: "Python", img: "/images/python.png" },
    ];

    const [selectedField, setSelectedField] = useState("기획");
    
    const subOptions : { [key:string] : string[]} = {
        "기획" : ["UI/UX 기획", "게임기획", "프로젝트 매니저", "프로덕트 매니저/오너", "콘텐츠 기획", "하드웨어 기획", "기타"],
        "디자인" : ["그래픽 디자인", "UI/UX 디자인", "3D 디자인","도트 디자인", "모션/이펙트 디자인", "BX/브랜드 디자인", "하드웨어 디자인", "기타"],
        "프론트엔드" : ["웹프론트엔드", "웹퍼블리셔", "iOS", "안드로이드", "크로스플랫폼", "게임클라이언트", "임베디드"],
        "백엔드" : ["웹 서버", "블록체인", "AI", "DBA/빅데이터/DS", "게임 서버", "프롬프트 엔지니어", "아키텍스(TA/DA/AA)", "보안/화이트해커", "네트워크/클라우드"],
        "운영" : ["사업기획(BD/BA)", "마케터", "재무/회계", "영업", "전략", "컨설팅", "투자", "고문", "인사(HR)", "기타"],
    };
    
    const selectedOps = [];

    console.log(selectedField);

    return (
        <div className="w-[522px] h-[927px] border border-2 rounded-[24px] p-12">
           
            <div className="text-[26px] font-bold mb-10">기본정보 수정</div>
            
            <form className="my-5">
                {/* 이름 */}
                <div className="flex flex-col items-start justify-center my-5 gap-y-3">
                    <div className="text-[16px] font-bold">이름</div>
                    <input 
                    className="w-full h-[41px] border border-1 border-[#D9D9D9] rounded-[10px] px-4 text-[14px] focus:outline focus:outline-2 focus:outline-[#6BB4FF]" 
                    placeholder="" />
                </div>

                {/* 나이 */}
                <div className="flex flex-col items-start justify-center my-5 gap-y-3">
                    <div className="text-[16px] font-bold">나이</div>
                    <input 
                    className="w-full h-[41px] border border-1 border-[#D9D9D9] rounded-[10px] px-4 text-[14px] focus:outline focus:outline-2 focus:outline-[#6BB4FF]" 
                    placeholder="" />
                </div>

                {/* 성별 */}
                <div className="flex flex-col items-start justify-center my-5 gap-y-3">
                    <div className="text-[16px] font-bold">성별</div>
                    <div className="flex gap-x-4">
                        <div className="w-[89px] h-[41px] rounded-[20px] border border-1 border-[#D9D9D9] flex items-center justify-center text-[14px]">여성</div>
                        <div className="w-[89px] h-[41px] rounded-[20px] border border-1 border-[#D9D9D9] flex items-center justify-center text-[14px]">남성</div>
                    </div>
                </div>                                                      

                {/* 이메일 */}
                <div className="flex flex-col items-start justify-center my-5 gap-y-3">
                    <div className="text-[16px] font-bold">이메일 계정</div>
                    <input 
                    typeof="email"
                    className="w-full h-[41px] border border-1 border-[#D9D9D9] rounded-[10px] focus:outline focus:outline-2 focus:outline-[#6BB4FF] px-4 text-[14px]" 
                    placeholder="" />
                    <div className="text-[10px] text-[#CA2A30] px-3">※ 올바른 메일 형태로 작성해주세요</div>
                </div>

                {/* 분야 */}
                <div className="flex flex-col items-start justify-center my-5 gap-y-3">
                    <div className="text-[16px] font-bold">분야</div>
                    <div className="relative w-full">
                        <select 
                        value={selectedField}
                        onChange={(e) => setSelectedField(e.target.value)}
                        className="w-full h-[41px] border border-1 border-[#D9D9D9] rounded-[10px] focus:outline-none px-4 pr-10 text-[14px] appearance-none">
                            <option value="기획">기획</option>
                            <option value="디자인">디자인</option>
                            <option value="프론트엔드">프론트엔드</option>
                            <option value="백엔드">백엔드</option>
                            <option value="운영">운영</option>
                        </select>
                        <RiArrowDownWideFill className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none"/>
                    </div>
                </div>

                {/* 세부분야 */}
                <div className="relative w-full">
                    {selectedField && subOptions[selectedField] && (
                        <select className="w-full h-[41px] border border-1 border-[#D9D9D9] rounded-[10px] focus:outline-none px-4 pr-10 text-[14px] appearance-none">
                            {subOptions[selectedField].map((r, index) => (
                                <option key={index} value={r}>{r}</option>
                            ))}
                        </select>
                    )}
                    <RiArrowDownWideFill className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none"/>
                </div>

                {/* 기술스택 */}
                <div className="flex flex-col items-start justify-center my-5 gap-y-1">
                    <div className="text-[12px] text-[#6BB4FF]">*복수 선택 가능</div>
                    <input 
                    type="text"
                    value={searchStack}
                    className="w-full h-[41px] border border-1 border-[#D9D9D9] rounded-[10px] focus:outline-none px-4 text-[14px]" 
                    placeholder="기술 스택을 검색해주세요." 
                    onChange={(e) => {
                        const keyword = e.target.value;

                        setSearchStack(keyword);
                        setSelectedStack(allStacks.filter(stack =>
                            stack.toLowerCase().includes(keyword.toLowerCase())
                        ));
                    }}
                    />
                    
                    {searchStack && (
                        <div className="w-full flex gap-x-2 my-1">
                            {stackImgs.filter(s => selectedStack.includes(s.name)).map((st, idx) => (
                                <div className=" flex w-[84px] h-[40px] border border-1 border-[#6BB4FF] rounded-[22.5px] justify-between px-4 items-center bg-[#EDF6FF]">
                                    <img 
                                    key={idx} alt="selectedStack Name" 
                                    src={st.img}
                                    className="w-[33px] h-[33px]"
                                    />
                                    <div>X</div>
                                </div>
                            ))}
                        </div>
                    )}
                    
                </div>

                <button className="w-[418px] h-[47px] bg-[#6BB4FF] rounded-[10px]">등록하기</button>
            </form>
        </div>
    )
};