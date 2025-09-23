import CardList from "@/components/CardList";
import ProjectFilterBar from "./components/ProjectFilterBar";
import ProjectSortBar from "./components/ProjectSortBar";
import ProjectList from "./components/ProjectList";
import { ProjectFilterOptions, ProjectSearchParams } from "@/types/projectInfo";

const fetchInitialProjects = async (searchParams: ProjectSearchParams) => {
  console.log("api 요청", searchParams);
  return [];
};

export default async function ProjectsPage({searchParams}:{searchParams: ProjectSearchParams}) {
  const { projectCategory, recruitment, platformCategory, bigCategory, sort } = searchParams;
  // 기본값 설정
  const projects = await fetchInitialProjects(
    { 
      ...searchParams,
    }
  );

  return (
    <main className="mx-auto mt-10 w-11/12 max-w-7xl min-w-5xl">
      <h1 className="mb-11 text-4xl font-extrabold">프로젝트</h1>
      <ProjectFilterBar />
      <ProjectSortBar />
      <ProjectList projects={projects}/>
    </main>
  );
}
// "use client";
// import { useState, useEffect, useRef, useCallback } from 'react';

// // 외부 API에서 데이터를 가져오는 비동기 함수
// const fetchMoreData = async (page: number, limit: number) => {
// // https://jsonplaceholder.typicode.com라는 test용 restAPI를 통해 dummy json data를 보여줌
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`);
//   const newData = await res.json();
//   return newData;
// };

// const InfiniteScroll = () => {
//   const [data, setData] = useState<any[]>([]); // 데이터를 저장하는 상태
//   const [page, setPage] = useState(1); // 현재 페이지 번호를 저장하는 상태
//   const [loading, setLoading] = useState(false); // 로딩 상태를 저장하는 상태
//   const observerRef = useRef<IntersectionObserver | null>(null); // Intersection Observer 참조를 저장하는 ref
//   const loadMoreRef = useRef<HTMLDivElement | null>(null); // 로드 모어 div 참조를 저장하는 ref

//   // 초기 데이터를 로드하는 useEffect
//   useEffect(() => {
//     const loadInitialData = async () => {
//       setLoading(true);
//       const initialData = await fetchMoreData(1, 10);
//       setData(initialData);
//       setLoading(false);
//     };

//     loadInitialData();
//   }, []);

//   // 더 많은 데이터를 로드하는 함수
//   const loadMore = async () => {
//     setLoading(true);
//     const newPage = page + 1;
//     const newData = await fetchMoreData(newPage, 10);
//     setData((prevData) => [...prevData, ...newData]);
//     setPage(newPage);
//     setLoading(false);
//   };

//   // Intersection Observer의 콜백 함수
//   const handleObserver = useCallback(
//     (entries: IntersectionObserverEntry[]) => {
//       const target = entries[0];
//       if (target.isIntersecting) {
//         loadMore();
//       }
//     },
//     [page]
//   );

//   // Intersection Observer를 설정하는 useEffect
//   useEffect(() => {
//     observerRef.current = new IntersectionObserver(handleObserver, {
//       rootMargin: '20px',
//     });

//     if (loadMoreRef.current) {
//       observerRef.current.observe(loadMoreRef.current);
//     }

//     return () => {
//       if (loadMoreRef.current) {
//         observerRef.current?.unobserve(loadMoreRef.current);
//       }
//     };
//   }, [handleObserver]);

//   return (
//     <div>
//       <ul>
//         {data.map((item) => (
//           <li key={item.id}>{item.title}</li>
//         ))}
//       </ul>
//       <div ref={loadMoreRef} style={{ height: '20px', backgroundColor: 'transparent' }} />
//       {loading && <p>Loading...</p>}
//     </div>
//   );
// };

// export default InfiniteScroll;