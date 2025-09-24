import Card from "@/components/Card";
import CardSkeleton from "./CardSkeleton";
import CircleSpinner from "./CircleSpinner";

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

export default function ProjectList() { // projects prop은 나중에 실제 데이터를 사용할 때 추가
  return (
      <>
        <div className="grid grid-cols-4 gap-0">
          {Array(12).fill(0).map((idx) => (
            <Card key={idx} {...dummyCard}/>
          ))}
          {Array(8).fill(0).map((idx) => (
            <CardSkeleton key={idx} />
          ))}
        </div>
        <div className="flex flex-col gap-2 items-center py-8">
          <CircleSpinner />
        </div>
      </>
    );
}