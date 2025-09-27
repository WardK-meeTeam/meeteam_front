"use client";

import CardList from "@/components/CardList";
import TeamRecruitCardList from "@/components/TeamRecruitCardList";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { useState, useRef, useEffect, useMemo} from "react";
import { ProjectInfoItem } from "@/types/projectInfo";

const CATEGORY_TO_ID: Record<string, number> = {
    "친환경" : 1, 
    "반려동물": 2, 
    "헬스케어": 3, 
    "교육/학습": 4, 
    "AI테크": 5, 
    "패션/뷰티": 6, 
    "금융/생산성": 7, 
    "기타": 8,
}


export default function HomePage() {

    const category = [
        "친환경", 
        "반려동물", 
        "헬스케어", 
        "교육/학습", 
        "AI테크", 
        "패션/뷰티", 
        "금융/생산성", 
        "기타",
    ];

    const [selectedCategory, setSelectedCategory] = useState<string>("친환경");
    const [projects, setProjects] = useState<ProjectInfoItem[]>([]);

    const API = process.env.NEXT_PUBLIC_API_BASE_URL;
    const bigCategoryId = useMemo(
        () => CATEGORY_TO_ID[selectedCategory] ?? CATEGORY_TO_ID["기타"],
        [selectedCategory]
    );

    const handleCategory = (cat: string) => {
       setSelectedCategory(cat);
    }

    // 카테고리별 프로젝트 불러오기
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch(
                    `${API}/api/main/projects?page=0&size=10&sort=createdAt&direction=desc&bigCategoryId=${bigCategoryId}`,
                    {
                        method: "GET",
                        headers: { Accept: "application/json" },
                        credentials: "include",
                    }
                );
                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.message || "프로젝트 조회 실패"); 
                }
                const data = await res.json();
                setProjects(data.content);
            } catch (e) {
                console.error(e);
            } finally {
            }
        };
        fetchProjects();
    }, [bigCategoryId, API]);

    // 스크롤 
    const scrollRef = useRef<HTMLDivElement>(null);
    const scrollRefTeam = useRef<HTMLDivElement>(null);
    const STEP = 305 + 300;
    const STEPT = 305 + 200;

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({left: -STEP, behavior: "smooth"});
    };
    const scrollRight = () => {
        scrollRef.current?.scrollBy({left: STEP, behavior: "smooth"});
    };

    const scrollLeftT = () => {
        scrollRefTeam.current?.scrollBy({left: -STEPT, behavior: "smooth"});
    };
    const scrollRightT = () => {
        scrollRefTeam.current?.scrollBy({left: STEPT, behavior: "smooth"});
    };

    return (
        <main className="flex flex-col justify-center items-center gap-y-5">
            {/**광고 자리 */}
            <div className="w-[88%] h-[180px] bg-[#F8F8F8] my-3">
            </div>

            <div className="flex flex-col w-[88%]">
                <div className="flex flex-col relative ">
                    {/**회색 바 */}
                    <div className="w-full h-[1.7px] absolute bottom-0 bg-[#E8E8E8] mt-2"></div>

                    <div className="px-5 py-5 flex gap-x-7 justify-start items-center">
                    {category.map((name) => {
                        const isSelected = selectedCategory === name;
                        return (
                        <button
                        key={name}
                        type="button"
                        onClick={() => setSelectedCategory(name)}
                        className="relative w-auto flex flex-col items-center font-semibold cursor-pointer select-none"
                        
                        >
                            <span className={`text-[18px] ${isSelected ? "text-black" : "text-[#A5A5A5]"}`}>
                                {name}
                            </span>
                            
                            {/* 파란색 바*/}
                            {isSelected && (
                                <div
                                style={{ width: `${name.length * 19}px` }}
                                className="h-[1.7px] bg-[#6BB4FF] absolute top-9 mt-2"
                                />
                                )}
                        </button>
                        );
                    })}
                    </div>
                </div>
            </div>

            <div className="w-[88%] flex flex-col">
                <div className="px-8 py-1 text-[26px] font-bold mt-1" >프로젝트</div>
                <div 
                ref={scrollRef}
                className="h-[440px] my-1 overflow-x-auto overflow-y-hidden
                [scrollbar-width: none] [&::-webkit-scrollbar]:hidden">
                    <CardList />
                </div>
                <div className="w-full h-3 flex gap-x-3 px-5">
                    <button 
                    type="button" 
                    onClick={scrollLeft} 
                    className="w-[40px] h-[40px] rounded-[50%] border border-[1px] border-[#CFCFCF] flex justify-center items-center cursor-pointer"
                    >
                        <IoIosArrowBack className="w-[30px] h-[30px] text-[#CFCFCF] "/>
                    </button>
                    <button 
                    type="button" 
                    className="w-[40px] h-[40px] rounded-[50%] border border-[1px] border-[#CFCFCF] flex justify-center items-center cursor-pointer"
                    >
                        <IoIosArrowForward onClick={scrollRight} className="w-[30px] h-[30px] text-[#CFCFCF] "/>
                    </button>
                </div>
            </div>

            <div className="w-[88%] flex flex-col my-5 pb-10">
                <div className="px-8 py-3 text-[26px] font-bold mt-10 mb-3">팀을 구해요!</div>
                <div 
                ref={scrollRefTeam}
                className="h-[260px] my-1 overflow-x-auto overflow-y-hidden
                    [scrollbar-width: none] [&::-webkit-scrollbar]:hidden">
                    <TeamRecruitCardList /> 
                </div>
                <div className="w-full h-3 flex gap-x-3 px-5">
                    <button 
                    type="button" 
                    onClick={scrollLeftT} 
                    className="w-[40px] h-[40px] rounded-[50%] border border-[1px] border-[#CFCFCF] flex justify-center items-center cursor-pointer"
                    >
                        <IoIosArrowBack className="w-[30px] h-[30px] text-[#CFCFCF] "/>
                    </button>
                    <button 
                    type="button" 
                    className="w-[40px] h-[40px] rounded-[50%] border border-[1px] border-[#CFCFCF] flex justify-center items-center cursor-pointer"
                    >
                        <IoIosArrowForward onClick={scrollRightT} className="w-[30px] h-[30px] text-[#CFCFCF] "/>
                    </button>
                </div>
            </div>
        </main>
    )
}