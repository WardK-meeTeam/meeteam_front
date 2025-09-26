"use client";

import Card from "@/components/Card";
import ProjectLoading from "./ProjectLoading";
import { useEffect, useRef, useState } from "react";

const dummyCard = {
  category: "Healthcare",
  tool: "Figma",
  teamName: "BreathMate",
  date: "2025.06.01",
  tools: ["Ai", "Figma", "Ps"],
  title: "스마트 호흡 트레커를 통한 천식 모니터링 앱",
  leader: "김도윤",
  progress: 70,
  teamSize: 9,
  userImg: [
    "/images/userImg1.png",
    "/images/userImg2.png",
    "/images/userImg3.png",
    "/images/userImg4.png",
    "/images/userImg5.png",
    "/images/userImg6.png",
    "/images/userImg7.png",
  ],
  deadDate: "2025.10.06",
  passionLevel: 99,
};

export default function ProjectList({ 
  initialProjects,
  limit,
 }: { 
  initialProjects: any[], // projects prop은 나중에 실제 데이터를 사용할 때 추가
  limit: number 
}) {
  console.log(initialProjects);

  const [projects, setProjects] = useState(initialProjects);
  const [isLoading, setIsLoading] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [page, setPage] = useState(1);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const fetchNextPage = async (page: number, limit: number) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newProjects = Array(limit).fill(dummyCard);
    setProjects(prev => [...prev, ...newProjects]);
    setIsLoading(false);
    //last확인 로직
  };
  
  useEffect(() => {
    setProjects(initialProjects);
    setIsLoading(false);
    setIsLast(false);
  }, [initialProjects]);

  useEffect(() => {
    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isLast && !isLoading) {
          console.log("화면에 들어옴:", entry.target);
          setIsLoading(true);
          fetchNextPage(page, limit);
          setPage(prev => prev + 1);
        }
      });
    };

    const observer = new IntersectionObserver(callback, {
      root: null,              // 관찰 기준 (null=viewport)
      rootMargin: "400px 0px", // 관찰 영역 여유 (예: 아래쪽 200px 일찍 발동)
      threshold: 0.1           // 10% 보이면 발동
    });

    if (scrollRef.current) {
      observer.observe(scrollRef.current);
    }

    // cleanup
    return () => {
      observer.disconnect();
    };
  }, [isLast, isLoading]); // 의존성 배열에 상태 추가

  return (
      <>
        <div className="grid grid-cols-4 gap-0">
          {projects.map((project, idx) => (
            <Card key={idx} {...project} />
          ))}
          <div ref={scrollRef} />
        </div>
        <ProjectLoading />
      </>
    );
}