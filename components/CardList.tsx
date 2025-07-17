"use client";

import Card from "./Card";

const dummyCard = {
    category: "HealthCare",
    tool: "Figma",
    teamName: "BreathMate",
    date: "2025.06.01",
    tools: ["Ai", "Figma", "Ps"],
    title: "스마트 호흡 트레커를 통한 천식 모니터링 앱",
    leader: "김도윤",
    progress: 70,
};

export default function CardList() {
    
    return (
        <div className="ml-6 flex items-center justify-start w-[90%] overflow-hidden">
            {Array(1).fill(0).map((idx) => (
                <Card key={idx} {...dummyCard}/>
            ))}
        </div>
    )
};