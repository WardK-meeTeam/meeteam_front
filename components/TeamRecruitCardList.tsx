"use client";

import { useEffect, useState } from "react";
import TeamRecruitCard from "./TeamRecruitCard";
import { publicFetch } from "@/app/publicFetch";

interface MemberCardApiResponse {
  result?: Array<{
    memberId: number;
    realName: string;
    storeFileName?: string;
    temperature?: number;
    projectCount?: number;
    skillList?: string[];
  }>;
}

export default function TeamRecruitCardList() {
  const [cards, setCards] = useState<{
    userId: number;
    profileImg: string;
    name: string;
    temp: number;
    sideProjectCount: number;
    skills: string[];
  }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const API = process.env.NEXT_PUBLIC_API_BASE_URL;
        const res = await publicFetch(`${API}/api/members/all`, { method: "GET" });
        if (!res.ok) {
          
          if (res.status !== 401) console.warn("members fetch failed:", res.status);
          setCards([]);
          return;
        }
        const data: MemberCardApiResponse = await res.json();
        if (cancelled) return;

        const mapped = (data.result ?? []).map((m) => ({
          userId: m.memberId,
          profileImg: m.storeFileName || "/images/userImg2.png",
          name: m.realName || "-",
          temp: Math.round((m.temperature ?? 0) * 10) / 10,
          sideProjectCount: m.projectCount ?? 0,
          skills: m.skillList ?? [],
        }));
        setCards(mapped);
      } catch (e) {
        console.error(e);
        if (!cancelled) setCards([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const skeletons = Array(8).fill(0).map((_, i) => (
    <div key={`skeleton-${i}`} className="w-[305px] h-[200px] bg-[#F5F7F9] rounded-[16px] animate-pulse shrink-0" />
  ));

  return (
    <div className="w-full h-full">
      <div className="flex gap-x-5 justify-start items-start w-full h-full">
        {loading && skeletons}
        {!loading && cards.length === 0 && skeletons}
        {!loading && cards.length > 0 && (
          cards.map((c, i) => (
            <TeamRecruitCard
              key={`member-card-${i}`}
              {...c}
              className="shrink-0"
            />
          ))
        )}
      </div>
    </div>
  );
}

// 메인 하단 영역 로딩 스켈레톤 노출용 컴포넌트
export function TeamRecruitSkeletonRow() {
  const skeletons = Array(8).fill(0).map((_, i) => (
    <div key={`skeleton-${i}`} className="w-[305px] h-[200px] bg-[#F5F7F9] rounded-[16px] animate-pulse shrink-0" />
  ));
  return (
    <div className="w-full h-full">
      <div className="flex gap-x-5 justify-start items-start w-full h-full">
        {skeletons}
      </div>
    </div>
  );
}
