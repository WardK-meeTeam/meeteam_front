"use client";

import TeamRecruitCard from "./TeamRecruitCard";

const dummyCard = {
  userId: 1,
  profileImg: "/images/userImg2.png",
  name: "김도윤",
  temp: 45,
  sideProjectCount: 9,
  skills: ["Adobe Illustrator", "Adobe Photoshop", "Figma"],
};

export default function TeamRecruitCardList() {
  return (
    <div className="w-full h-full">
      <div className="flex gap-x-7 justify-start items-start w-full h-full">
          {Array(8)
          .fill(0)
          .map((_, i) => (
            <TeamRecruitCard  
            key={i} 
            {...dummyCard} 
            className="shrink-0"
            />
          ))}
      </div>
    </div>
  );
}
