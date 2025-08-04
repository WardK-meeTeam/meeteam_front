"use client";

import CardList from "@/components/CardList";
import TeamRecruitCardList from "@/components/TeamRecruitCardList";
import BasicInfoPopup from "@/components/BasicInfoPopup";

const dummyStacks = {
    stacks : {
        react: "/images/react.png",
        flutter : "images/flutter.png",
    }
}

export default function CardTestPage() {

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-center mt-5">
                <CardList />
            </div>
        
            <div className="flex items-center justify-center mt-5">
                <TeamRecruitCardList />
            </div>

            <div className="flex items-center justify-center my-5">
                <BasicInfoPopup />
            </div>
        </div>

    )
}