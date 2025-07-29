"use client";

import TeamRecruitCard from "./TeamRecruitCard";

const dummyCard = {
    profileImg : "/images/userImg2.png",
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
}

interface Skill {
    skillName: string;
    percent: number;
};

export default function TeamRecruitCardList() {
    
    return (
        <div className="ml-6 flex items-center justify-start w-[90%] overflow-hidden gap-x-3">
            {Array(4).fill(0).map((idx) => (
                <TeamRecruitCard key={idx} {...dummyCard}/>
                ))}
        </div>
    )
}