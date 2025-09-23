"use client";

import Card from "./Card";

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

export default function CardList() {
  return (
    <div className="w-full h-full">
      <div className="flex items-start h-full justify-start w-full">
        {Array(8)
          .fill(0)
          .map((_,idx) => (
            <div  key={idx} className="shrink-0">
              <Card {...dummyCard} />
            </div>
          ))}
      </div>
    </div>
  );
}
