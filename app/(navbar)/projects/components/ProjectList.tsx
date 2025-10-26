"use client";

import Card from "@/components/Card";
import ProjectListLoading from "./ProjectListLoading";
import { useEffect, useRef, useState } from "react";
import { ProjectListItem } from "@/types/projectInfo";
import NoResult from "./NoResult";
import { authFetch } from "@/api/authFetch";
import { buildQueryString } from "@/utils/buildQueryString";
import { mapProjectToCardProps } from "@/utils/mapProjectToCardProps";
import ProjectSortBar from "./ProjectSortBar";
import { sortOptions } from "@/constants/projectOptions";
import Link from "next/link";

export default function ProjectList({ 
  initialProjects,
  last,
  totalElements,
  searchParams
 }: { 
  initialProjects: ProjectListItem[],
  last: boolean,
  totalElements: number,
  searchParams?: any // 검색 파라미터 추가
}) {

  const [projects, setProjects] = useState(Array.isArray(initialProjects) ? initialProjects : []);
  const [isLoading, setIsLoading] = useState(false);
  const [isLast, setIsLast] = useState(last);
  const [page, setPage] = useState(1);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const fetchNextPage = async () => {
    if (isLoading || isLast) return; // 로딩 중이거나 마지막 페이지면 중단
    
    setIsLoading(true);
    
    try {
      // 다음 페이지 API 호출
      const queryParams = {
        ...(searchParams ?? {}),
        page: page, // 현재 page는 다음 페이지 번호
      };
      
      const queryString = buildQueryString(queryParams);
      
      const response = await authFetch(`/api/projects/condition${queryString}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch next page');
      }
      
      const data = await response.json();
      const newProjects = data.content || [];
      
      // 새 프로젝트들을 기존 목록에 추가
      setProjects(prev => [...prev, ...newProjects]);
      setIsLast(data.last || newProjects.length === 0);
      setPage(prev => prev + 1);
      
    } catch (error) {
      console.error('다음 페이지 로딩 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 무한 스크롤 로직
  useEffect(() => {
    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isLast && !isLoading) {
          console.log('fetchNextPage 호출');
          fetchNextPage();
        }
      });
    };

    const observer = new IntersectionObserver(callback, {
      root: null,              // 관찰 기준 (null=viewport)
      rootMargin: "400px 0px", // 관찰 영역 여유 (예: 아래쪽 400px 일찍 발동)
      threshold: 0.1           // 10% 보이면 발동
    });

    if (scrollRef.current) {
      observer.observe(scrollRef.current);
    }

    // cleanup
    return () => {
      observer.disconnect();
    };
  }, [isLast, isLoading, fetchNextPage]); // 의존성 배열에 상태 추가


  return (
      <>
        <ProjectSortBar sortOptions={sortOptions} totalElements={totalElements} />
        <div className="grid grid-cols-4 gap-8">
          { projects.length > 0 ?
            projects.map((project, idx) => (
              <Link href={`/projects/${project.projectId}/detail`} key={idx}>
                <Card key={idx} {...mapProjectToCardProps(project)} />
              </Link>
            )) :
            <NoResult />
          }
          <div ref={scrollRef} />
        </div>
        { !isLast ? <ProjectListLoading sortBar={false} /> : null }
      </>
    );
}