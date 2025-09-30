"use client";

import Card from "./Card";

const dummyCard = {
  projectId: 1,
  category: "HEALTHCARE",
  tool: "Figma",
  teamName: "BreathMate",
  date: "2025.06.01",
  skills: ["React", "Figma", "Photoshop"],
  title: "스마트 호흡 트레커를 통한 천식 모니터링 앱",
  leader: "김도윤",
  userImg: [
    "/images/userImg1.png",
    "/images/userImg2.png",
    "/images/userImg3.png",
    "/images/userImg4.png",
    "/images/userImg5.png",
    "/images/userImg6.png",
    "/images/userImg7.png",
  ],
  startDate: "2025.10.06",
  endDate: "2026.10.06",
  projectImageUrl: "/images/HealthCare.png",
  currentCount: 7,
  recruitmentCount: 10,
  projectMembers: [
    { memberId: 1, name: "김도윤", imageUrl: "/images/userImg1.png", creator: true },
    { memberId: 2, name: "이서연", imageUrl: "/images/userImg2.png", creator: false },
    { memberId: 3, name: "박민준", imageUrl: "/images/userImg3.png", creator: false },
    { memberId: 4, name: "최예은", imageUrl: "/images/userImg4.png", creator: false },
    { memberId: 5, name: "정하윤", imageUrl: "/images/userImg5.png", creator: false },
    { memberId: 6, name: "강지우", imageUrl: "/images/userImg6.png", creator: false },
    { memberId: 7, name: "윤서아", imageUrl: "/images/userImg7.png", creator: false },
    { memberId: 8, name: "윤서아", imageUrl: "/images/userImg7.png", creator: false },
    { memberId: 9, name: "윤서아", imageUrl: "/images/userImg7.png", creator: false },

  ]
};

export default function CardList() {
  return (
    <div className="w-full h-full">
      <div className="flex justify-start items-start w-full h-full">
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
