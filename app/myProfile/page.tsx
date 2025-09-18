"use client";

import ToggleSwitchButton from "@/components/ToggleSwitchButton";
import { IoIosStar } from "react-icons/io";
import { useState } from "react";
import { useRef } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import Image from "next/image";

export default function myPofile() {

    const dummyPartGroups = [
        ["디자인", "uiux디자인"], 
        ["디자인", "3d 그래픽"], 
        ["프론트엔드", "웹 프론트엔드"]
    ];
    const dummyStacksImg = ["/images/Ps.png", "/images/Figma.png", "/images/Ps.png"];
    const dummyReviews = [
        {name: "박서현", star: 4.5, review: "디자인 감각이 뛰어나고 세부적인 디테일까지 꼼꼼하게 챙기는 모습이 인상적입니다. 아이디어 회의 때는 다른 사람의 생각을 잘 경청하며...."},
        {name: "박서현", star: 4.0, review: "디자인 감각이 뛰어나고 세부적인 디테일까지 꼼꼼하게 챙기는 모습이 인상적입니다. 아이디어 회의 때는 다른 사람의 생각을 잘 경청하며...."},
        {name: "박서현", star: 4.5, review: "디자인 감각이 뛰어나고 세부적인 디테일까지 꼼꼼하게 챙기는 모습이 인상적입니다. 아이디어 회의 때는 다른 사람의 생각을 잘 경청하며...."},
        {name: "박서현", star: 4.0, review: "디자인 감각이 뛰어나고 세부적인 디테일까지 꼼꼼하게 챙기는 모습이 인상적입니다. 아이디어 회의 때는 다른 사람의 생각을 잘 경청하며...."},

    ]

    const dummyProjects = [
        {
            category: "Healthcare",
            state: "InProgress", 
            endDate: {year: "2025", month: "8", day: "12",},
            title: "스마트 호흡 트레커를 통한 천식 모니터링 앱",
            bgImg: "/images/HealthCare.png",
        },
        {
            category: "Pet",
            state: "InProgress", 
            endDate: {year: "2025", month: "8", day: "12",},
            title: "스마트 호흡 트레커를 통한 천식 모니터링 앱",
            bgImg: "/images/Pet.png",
        },
        {
            category: "Healthcare",
            state: "InProgress", 
            endDate: {year: "2025", month: "8", day: "12",},
            title: "스마트 호흡 트레커를 통한 천식 모니터링 앱",
            bgImg: "/images/HealthCare.png",
        },
        {
            category: "Productivity",
            state: "Complete", 
            endDate: {year: "2025", month: "8", day: "12",},
            title: "스마트 호흡 트레커를 통한 천식 모니터링 앱",
            bgImg: "/images/Productivity.png",
        },
        {
            category: "Education",
            state: "Complete", 
            endDate: {year: "2025", month: "8", day: "12",},
            title: "스마트 호흡 트레커를 통한 천식 모니터링 앱",
            bgImg: "/images/Education.png",
        },
        {
            category: "Healthcare",
            state: "InProgress", 
            endDate: {year: "2025", month: "8", day: "12",},
            title: "스마트 호흡 트레커를 통한 천식 모니터링 앱",
            bgImg: "/images/HealthCare.png",
        },
        {
            category: "Pet",
            state: "InProgress", 
            endDate: {year: "2025", month: "8", day: "12",},
            title: "스마트 호흡 트레커를 통한 천식 모니터링 앱",
            bgImg: "/images/Pet.png",
        },
        {
            category: "Healthcare",
            state: "InProgress", 
            endDate: {year: "2025", month: "8", day: "12",},
            title: "스마트 호흡 트레커를 통한 천식 모니터링 앱",
            bgImg: "/images/HealthCare.png",
        },
        {
            category: "Productivity",
            state: "Complete", 
            endDate: {year: "2025", month: "8", day: "12",},
            title: "스마트 호흡 트레커를 통한 천식 모니터링 앱",
            bgImg: "/images/Productivity.png",
        },
        {
            category: "Education",
            state: "Complete", 
            endDate: {year: "2025", month: "8", day: "12",},
            title: "스마트 호흡 트레커를 통한 천식 모니터링 앱",
            bgImg: "/images/Education.png",
        },
    ];

    // 순서대로 [textColor, boxColor, (gradient colors 3개)]
    const CategoryColors : { [key: string] : [string, string, string, string] } = {
        Beauty: ["#DB6893", "#FFF0F9", "#F3D8E6", "#F2CAD2"],          
        Eco: ["#71B04E", "#E5FFD6", "#AAEBE0", "#CBE8BA"],
        Education: ["#A27DC2", "#F5E9FF", "#C7C9EE", "#DDCCEA"],
        Pet: ["#F1A800", "#FFFCE9", "#F4D2BD", "#F4EDBF"],
        Productivity: ["#3A84BC", "#D9FBFF", "#CCDEFF", "#B5E7ED"],
        Healthcare: ["#EE7366", "#FFEAE8", "#FFCAC1", "#F7E2DC"],
    };
    
    const [selected, setSelected] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const STEP = 365 + 20;

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({left: -STEP, behavior: "smooth"});
    };

    const scrollRight = () => {
        scrollRef.current?.scrollBy({left: STEP, behavior: "smooth"});
    };

    return (
        <div className="flex justify-center gap-x-11">

            {/*왼쪽 정보 */}
            <aside className="flex flex-col gap-y-12 mr-5">
                <div className="flex flex-col gap-y-4 items-center">
                    <Image 
                    alt="사용자 프로필 이미지"
                    src="/images/userImg1.png"
                    width={194}
                    height={194}
                    className="rounded-[50%]"
                    />
                    <div className="flex justify-center items-center gap-x-4">
                        <div className="text-[36px] font-extrabold">김성림</div>
                        <div className="text-[14px] text-[#AD5FFF]">정보 수정하기</div>
                    </div>
                    <div className="w-[148px] h-[45px] rounded-[8px] bg-[#FFF3F0] text-[16px] flex justify-center items-center text-[#FF4802] font-bold">
                        협업온도🔥 98°
                    </div>
                </div>

                <div className="flex justify-center items-between gap-x-9 mt-10">
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
                            {dummyPartGroups.map(([left, right], idx) => (
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
                        {dummyStacksImg.map((stack, idx) => (
                            <Image alt="기술 스택 아이콘" key={idx} src={stack} width={40} height={40} className="rounded-[50%]"/>
                        ))}
                    </div>
                    <div className="flex gap-x-3 mt-7">
                        <div className="text-[16px] font-bold">프로젝트 참여 여부</div>
                        <ToggleSwitchButton onClick={() => setSelected((prev) => !prev) } isSelected={selected}/>
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
            <main className="flex flex-col gap-y-12 mt-10 ml-10 pl-10">
                <div>
                    <div className="text-[40px] font-extrabold">안녕하세요! 김성림입니다🐠</div>
                    <div className="text-[16px] my-8">
                        저는 시각디자인과에서
                        <br/>
                        타이포그래피, 레이아웃, 그리고 브랜딩 작업을 즐기는 디자이너입니다
                        <br/>
                        깔끔한 디자인 안에 톡톡 튀는 포인트💫를 넣는 걸 좋아합니다
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <div className="text-[15px] font-bold">제가 잘하는 것</div>
                        <div className="flex flex-col text-[15px] gap-y-1">
                            <div>- 포스터, 웹.앱, UI 디자인</div>
                            <div>- 위계가 잘 잡힌 타이포와 레이아웃</div>
                            <div>- 브랜드 컨셉 잡기와 키 비주얼 제작</div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-y-5 my-12">
                    <div className="flex items-center gap-x-5">
                        <div className="text-[20px] font-extrabold flex justify-center items-center">Review</div>
                        <div className="flex justify-center items-center">4개</div>
                    </div>

                    <div className="w-[753px] h-[2px] bg-black"></div>
                    <div 
                    ref={scrollRef} 
                    className="w-[753px] flex overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden gap-x-5"
                    >
                        {dummyReviews.map((idx, key) => (
                            <div
                            key={key} 
                            className="w-[365px] h-[169px] rounded-[8px] shrink-0 bg-[#F8F8F8]">
                                <div className="flex justify-between px-6 pt-5">
                                    <div className="text-[#474747] text-[16px] font-bold">{idx.name}</div>
                                    <div className="flex justify-center items-center gap-x-1">
                                        <IoIosStar className="w-[15.3px] h-[14.62px] text-[#00E457]"/>
                                        <div className="text-[16px] text-[#474747]">{idx.star.toFixed(1)}</div>
                                    </div>
                                </div>
                                <div className="m-5 px-1 text-[16px]">{idx.review}</div>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-x-3">
                        <button type="button" onClick={scrollLeft} className="w-[40px] h-[40px] rounded-[50%] border border-[1px] border-[#CFCFCF] flex justify-center items-center cursor-pointer">
                            <IoIosArrowBack className="w-[30px] h-[30px] text-[#CFCFCF] "/>
                            
                        </button>
                        <button type="button" onClick={scrollRight} className="w-[40px] h-[40px] rounded-[50%] border border-[1px] border-[#CFCFCF] flex justify-center items-center cursor-pointer">
                            <IoIosArrowForward className="w-[30px] h-[30px] text-[#CFCFCF] "/>
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-y-5 my-12">
                    <div className="flex items-center gap-x-5">
                            <div className="text-[20px] font-extrabold flex justify-center items-center">Project</div>
                            <div className="flex justify-center items-center">5개</div>
                    </div>
                    <div className="w-[753px] h-[2px] bg-black mb-5"></div>
                    <div className="h-[386px] overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-black scrollbar-track-[#EDEDED]">
                        <div className="grid grid-cols-3 gap-x-3 gap-y-5">
                            {dummyProjects.map((idx, key) => (
                                <div 
                                key={key}
                                className="aspect-[4/3] w-[244px] rounded-[8px] bg-cover bg-center flex flex-col justify-between"
                                style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 2%, rgba(0, 0, 0, 0.4) 83%), url(${idx.bgImg}) ` }}
                                >
                                   <div className="flex flex-col items-end justify p-4">
                                        <div 
                                        className="w-[58px] h-[18px] rounded-[10px] flex justify-center items-center"
                                        style={{ backgroundColor: CategoryColors[idx.category][1]}}
                                        >
                                            <div
                                            style={{color: CategoryColors[idx.category][0]}}
                                            className="text-[8px] font-semibold"
                                            >{idx.state}</div>
                                        </div>
                                   </div> 
                                   <div className="flex flex-col justify-end p-3">
                                            <div className="flex text-white gap-x-2">
                                                <div className="text-[10px] font-semibold">프로젝트 완료일</div>
                                                <div className="text-[10px]">{idx.endDate.year}년 {idx.endDate.month}월 {idx.endDate.day}일</div>
                                            </div>
                                            <div className="text-[16px] font-extrabold text-white w-[164px]">{idx.title}</div>
                                    </div>
                                </div>  
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
        
        // husky hook 오류 테스트
    )
};