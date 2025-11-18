"use client";

import HomeCategoryTabs from "./components/HomeCategoryTabs";
import Card from "@/components/Card";
import TeamRecruitCardList, { TeamRecruitSkeletonRow } from "@/components/TeamRecruitCardList";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useRef, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ProjectLoading from "./projects/components/ProjectListLoading";
import { mapAnyProjectToCardProps } from "@/utils/mapProjectToCardProps";
import { publicFetch } from "../publicFetch";
import { buildQueryString } from "@/utils/buildQueryString";
import type {ProjectListItem, ProjectInfoItem, ProjectCategory} from "@/types/projectInfo";
import ProjectCardSkeleton from "./projects/components/ProjectCardSkeleton";

type AnyProject = ProjectListItem | ProjectInfoItem;

const isListItem = (p: AnyProject): p is ProjectListItem =>
    "projectId" in p && "projectName" in p;

export default function HomePageClient() {
    const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
    if (!API) {
        console.error("NEXT_PUBLIC_API_BASE_URL is not defined");
    }
    const sp= useSearchParams();
    
    const rawCategory = sp.get("category");
    const currentCategory = (rawCategory && rawCategory !== "")
        ? (rawCategory as ProjectCategory)
        : undefined;

    const [projects, setProjects] = useState<AnyProject[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    const advertisement = [
        "/images/banner_1.png",
        "/images/banner_2.png",
        "/images/banner_3.png",
        "/images/banner_4.png",
    ];

    const [currentAdvertisement, setCurrentAdvertisement] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentAdvertisement((prev) => (prev + 1) % advertisement.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [advertisement.length]);

    useEffect(() => { setMounted(true); }, []);

    useEffect(()=> {
        let cancelled = false;
        (async () => {
            try {
                setIsLoading(true);

                const queryString = buildQueryString({
                    page: 0,
                    size: 10,
                    sort: "createdAt,desc",
                    projectCategory: currentCategory,
                });

                const absoluteUrl = `${API}/api/projects/condition${queryString}`;
                const res = await publicFetch(absoluteUrl, { method: "GET" });

                if (!res.ok) {
                    console.error("[Home] fetch failed:", res.status, res.statusText);
                    throw new Error(`프로젝트 조회 실패: ${res.status}`);
                }
                const data = await res.json();
                if (!cancelled) {
                    const list = data?.content;
                    setProjects(Array.isArray(list) ? list : []);
                }
            } catch(e) {
                console.error(e);
                if (!cancelled) setProjects([]);
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        })();

        return () => { cancelled = true; };
    }, [API, currentCategory]);
    

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


    if (!mounted) {
        return (
            <main className="flex flex-col gap-y-5 justify-center items-center">
                <div className="w-[88%]">
                    <ProjectLoading count={6}/>
                </div>
                <div className="w-[93%]">
                    <TeamRecruitSkeletonRow />
                </div>
            </main>
        );
    }

    return (
        <main className="flex flex-col gap-y-5 justify-center items-center">
            {/**광고 자리 */}
            <div className="w-[1940px] h-[400px] bg-[#F8F8F8] my-3">
                <img alt="advertisement" className="object-contain w-full h-full" src={advertisement[currentAdvertisement]} />
            </div>

            <div className="flex flex-col w-[88%]">
                <HomeCategoryTabs/>
            </div> 

            <div className="w-[93%] flex flex-col">
                <div className="px-8 py-1 text-[26px] font-bold mt-1 ml-9" >프로젝트</div>
                <div 
                ref={scrollRef}
                className="h-[440px] my-1 overflow-x-auto overflow-y-hidden
                [scrollbar-width: none] [&::-webkit-scrollbar]:hidden">
                    {isLoading && ( 
                        <div className="flex gap-6 px-8">
                            { Array(6).fill(0).map((_, index) => (
                                <ProjectCardSkeleton key={index} />
                            )) }
                        </div>
                    )}
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

                                // 메인 응답에 id가 없을 수 있어서 가드용
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
                <div className="flex gap-x-3 px-5 ml-6 w-full h-3">
                    <button 
                    type="button" 
                    onClick={scrollLeft} 
                    className="w-[40px] h-[40px] rounded-[50%] border border-[1px] border-[#CFCFCF] flex justify-center items-center cursor-pointer"
                    >
                        <IoIosArrowBack className="w-[30px] h-[30px] text-[#CFCFCF] "/>
                    </button>
                    <button 
                    type="button" 
                    onClick={scrollRight}
                    className="w-[40px] h-[40px] rounded-[50%] border border-[1px] border-[#CFCFCF] flex justify-center items-center cursor-pointer"
                    >
                        <IoIosArrowForward className="w-[30px] h-[30px] text-[#CFCFCF] "/>
                    </button>
                </div>
            </div>

            <div className="w-[93%] flex flex-col my-5 pb-10 mt-10">
                <div className="flex flex-col">
                    <div className="px-8 py-3 text-[26px] font-bold  mb-3 ml-9 mt-3">팀을 구해요!</div>
                    <div 
                    ref={scrollRefTeam}
                    className="h-[215px] overflow-x-auto overflow-y-hidden
                        [scrollbar-width: none] [&::-webkit-scrollbar]:hidden ml-9">
                      <TeamRecruitCardList /> 
                    </div>
                </div>
                <div className="flex gap-x-3 px-5 ml-6 w-full h-3">
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


