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
    <div className="flex flex-col justify-center items-center">
      <div className="ml-6 flex items-center justify-start w-[90%] overflow-hidden">
        {Array(4)
          .fill(0)
          .map((idx) => (
            <Card key={idx} {...dummyCard} />
          ))}
      </div>
    </div>
  );
}
