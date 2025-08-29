"use client";

import TeamRecruitCard from "./TeamRecruitCard";

const dummyCard = {
  profileImg: "/images/userImg2.png",
  name: "김도윤",
  temp: 45,
  sideProjectCount: 9,
  skills: [
    {
      skillName: "Adobe Illustrator",
      percent: 40,
    },
    {
      skillName: "Adobe Photoshop",
      percent: 70,
    },
    {
      skillName: "Figma",
      percent: 40,
    },
  ],
};

interface Skill {
  skillName: string;
  percent: number;
}

export default function TeamRecruitCardList() {
  return (
    <div className="h-full w-full">
      <div className="flex items-start h-full justify-start w-full gap-x-7">
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
