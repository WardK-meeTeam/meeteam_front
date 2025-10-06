"use client";

import TeamRecruitCard from "@/components/TeamRecruitCard";
import UserLoading from "./UserListLoading";
import { useEffect, useRef, useState } from "react";
import NoResult from "@/components/NoResult";
import { buildQueryString } from "@/utils/buildQueryString";
import { mapUserToCardProps } from "@/utils/mapUserToCardProps";
import UserSortBar from "./UserSortBar";
import { sortOptions } from "@/constants/projectOptions";
import Link from "next/link";

const dummyUsers = Array(20).fill(0).map((_, idx) => (
  {
    userId: idx,
    name: `John Doe ${idx}`,
    temp: 45,
    sideProjectCount: 9,
    skills: ["React.js", "Next.js", "Tailwind CSS", "Java", "Python"],
    profileImg: "/images/userImg1.png",
  }
));

interface FetchUsers {
  content: any[];
  totalElements: number;
  last: boolean;
}

const tempFetchUsers = async (): Promise<FetchUsers> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        content: dummyUsers,
        totalElements: 328,
        last: false
      });
    }, 2000);
  });
}

export default function UserList({ 
  initialUsers,
  last,
  totalElements,
  searchParams
 }: { 
  initialUsers: any[],
  last: boolean,
  totalElements: number,
  searchParams?: any // 검색 파라미터 추가
}) {

  const [users, setUsers] = useState<any[]>(Array.isArray(initialUsers) ? initialUsers : []);
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

      console.log('api 호출 queryString: ', queryString);
      console.log('page: ', page);
      
      // const response = await authFetch(`/api/users/condition${queryString}`, {
      //   method: "GET",
      //   headers: { "Content-Type": "application/json" },
      // });
      
      // if (!response.ok) {
      //   throw new Error('Failed to fetch next page');
      // }
      
      // const data = await response.json();
      // const newUsers = data.content || [];
      
      // // 불러온 새 유저 목록을 기존 목록에 추가
      // setUsers(prev => [...prev, ...newUsers]);
      // setIsLast(data.last || newUsers.length === 0);
      // setPage(prev => prev + 1);

      const data = await tempFetchUsers();
      const newUsers = data.content || [];
      setUsers(prev => [...prev, ...newUsers]);
      setIsLast(data.last || newUsers.length === 0);
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
  }, [isLast, isLoading, fetchNextPage]); // 의존성 배열에 상태 추가

  console.log(users, 'users');

  return (
      <>
        <UserSortBar sortOptions={sortOptions} totalElements={totalElements} />
        <div className="grid grid-cols-4 gap-8">
          { users.length > 0 ?
            users.map((user, idx) => (
              <Link href={`/users/${user.userId}`} key={user.userId}>
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