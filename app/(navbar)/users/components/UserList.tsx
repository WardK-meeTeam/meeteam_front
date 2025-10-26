"use client";

import TeamRecruitCard from "@/components/TeamRecruitCard";
import UserLoading from "./UserListLoading";
import { useEffect, useRef, useState } from "react";
import NoResult from "./NoResult";
import { mapUserToCardProps } from "@/utils/mapUserToCardProps";
import UserSortBar from "./UserSortBar";
import Link from "next/link";
import { fetchUsers } from "@/api/fetchUsers";

export default function UserList({ 
  initialUsers,
  last,
  totalElements,
  searchParams,
  limit
 }: { 
  initialUsers: any[],
  last: boolean,
  totalElements: number,
  searchParams?: any, // 검색 파라미터 추가
  limit: number
}) {

  const [users, setUsers] = useState<any[]>(Array.isArray(initialUsers) ? initialUsers : []);
  const [isLoading, setIsLoading] = useState(false);
  const [isLast, setIsLast] = useState(last);
  const [page, setPage] = useState(1);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  
  // 무한 스크롤 로직
  useEffect(() => {
    const fetchNextPage = async () => {
      if (isLoading || isLast) return; // 로딩 중이거나 마지막 페이지면 중단
      
      setIsLoading(true);
      
      try {
        const data = await fetchUsers({ searchParams, page, limit });
        const newUsers = data.users || [];
        
        // 불러온 새 유저 목록을 기존 목록에 추가
        setUsers(prev => [...prev, ...newUsers]);
        setIsLast(data.last || newUsers.length === 0);
        setPage(prev => prev + 1);

      } catch (error) {
        console.error('다음 페이지 로딩 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

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
  }, [isLast, isLoading, page, searchParams, limit]);

  return (
      <>
        <UserSortBar totalElements={totalElements} />
        <div className="grid grid-cols-4 gap-8">
          { users.length > 0 ?
            users.map((user) => (
              <Link href={`/users/${user.memberId}`} key={user.memberId}>
                <TeamRecruitCard {...mapUserToCardProps(user)} />
              </Link>
            )) :
            <NoResult />
          }
          <div ref={scrollRef} />
        </div>
        { !isLast ? <UserLoading sortBar={false} /> : null }
      </>
    );
}