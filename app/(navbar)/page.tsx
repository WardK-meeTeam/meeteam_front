"use client";

import HomeCategoryTabs from "./components/HomeCategoryTabs";
import Card from "@/components/Card";
import TeamRecruitCardList from "@/components/TeamRecruitCardList";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useRef, useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ProjectLoading from "./projects/components/ProjectLoading";
import { mapAnyProjectToCardProps } from "@/utils/mapProjectToCardProps";
import { publicFetch } from "../publicFetch";
import type {
  ProjectListItem,
  ProjectInfoItem,
  ProjectCategory,
} from "@/types/projectInfo";

const CATEGORY_TO_BIG_ID = {
    ENVIRONMENT: 1,
    PET: 2,
    HEALTHCARE: 3,
    EDUCATION: 4,
    AI_TECH: 5,
    FASHION_BEAUTY: 6,
    FINANCE_PRODUCTIVITY: 7,
    ETC: 8,
  } as const satisfies Record<ProjectCategory, number>;

type AnyProject = ProjectListItem | ProjectInfoItem;

const isListItem = (p: AnyProject): p is ProjectListItem =>
    "projectId" in p && "projectName" in p;

export default function HomePage() {
    const API = process.env.NEXT_PUBLIC_API_BASE_URL!;
    const sp= useSearchParams();
    
    const currentCategory = (sp.get("category") ?? "ENVIRONMENT") as ProjectCategory;
    const bigCategoryId = CATEGORY_TO_BIG_ID[currentCategory] ?? CATEGORY_TO_BIG_ID.ENVIRONMENT;

    const [projects, setProjects] = useState<AnyProject[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    
    // 카테고리별 프로젝트 불러오기
    useEffect(() => {
        let cancelled = false;
        (async () => {
          try {
            setIsLoading(true);
            const query = `?page=0&size=10&sort=createdAt&direction=desc&bigCategoryId=${bigCategoryId}`;
            const res = await publicFetch(`/api/main/projects${query}`, { method: "GET" });

            if (!res.ok) throw new Error(`프로젝트 조회 실패: ${res.status}`);
            const data = await res.json();
            if (!cancelled) setProjects(Array.isArray(data?.content) ? data.content : []);
          } catch (e) {
            console.error(e);
            if (!cancelled) setProjects([]);
          } finally {
            if (!cancelled) setIsLoading(false);
          }
        })();

        return () => { cancelled = true; };
      }, [API, bigCategoryId]);
    

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
        <main className="flex flex-col gap-y-5 justify-center items-center">
            {/**광고 자리 */}
            <div className="w-[88%] h-[180px] bg-[#F8F8F8] my-3">
            </div>

            <div className="flex flex-col w-[88%]">
                <Suspense fallback={<ProjectLoading/>}>
                    <HomeCategoryTabs/>
                </Suspense>
            </div>

            <div className="w-[88%] flex flex-col">
                <div className="px-8 py-1 text-[26px] font-bold mt-1" >프로젝트</div>
                <div 
                ref={scrollRef}
                className="h-[440px] my-1 overflow-x-auto overflow-y-hidden
                [scrollbar-width: none] [&::-webkit-scrollbar]:hidden">
                    {isLoading && <ProjectLoading/>}
                    {!isLoading && (projects?.length ?? 0) === 0 && (
                        <div className="h-full flex items-center justify-center text-[#A5A5A5]">
                            표시할 프로젝트가 없습니다.
                        </div>
                    )}

                    {!isLoading && (projects?.length ?? 0) > 0 && (
                        <div className="flex gap-6 px-8">
                            {projects.map((p) => {
                                const card = <Card {...mapAnyProjectToCardProps(p)} />;
                                
                                if (isListItem(p)) {
                                    const id = p.projectId;
                                    return (
                                        <Link
                                        href={`/projects/${id}/detail`}
                                        key={`project-${id}`}
                                        className="shrink-0"
                                        >
                                            {card}
                                        </Link>
                                    );
                                }

                                // 메인 응답에 id가 없을 수 있어 가드
                                const fallbackKey = `home-${p.name ?? "no-name"}-${p.startDate ?? "no-date"}`;
                                return (
                                    <div key={fallbackKey} className="shrink-0">
                                        {card}
                                    </div>
                                );
                                })}
                            </div>
                    )}
                </div>
                <div className="flex gap-x-3 px-5 w-full h-3">
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
                <div className="flex gap-x-3 px-5 w-full h-3">
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