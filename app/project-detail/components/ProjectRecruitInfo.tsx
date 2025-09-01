import RecruitCurrentRow from "./RecruitCurrentRow";

const recruitStatus = [
  {
    field: "백엔드(웹 서버)",
    recruited: 1,
    capacity: 2,
  },
  {
    field: "프론트엔드(웹)",
    recruited: 0,
    capacity: 2,
  },
  {
    field: "프론트엔드(iOS)",
    recruited: 2,
    capacity: 2,
  },
  {
    field: "디자인(UI/UX)",
    recruited: 1,
    capacity: 2,
  },
];

const skills = ["Next.js", "javascript"];
const mustOffline = "필수";
const deadline = "2025년 6월 12일~2025년 6월 30일";

export default function ProjectRecruitInfo() {
  return (
    <div className="flex flex-col gap-10">
      <span className="text-[26px] font-bold">프로젝트 모집 정보</span>
      <section className="flex flex-row gap-15 items-baseline">
        <span className="font-bold">모집 분야</span>
        백엔드,프론트엔드,디자인,기획,마케팅
      </section>
      <section className="flex flex-row gap-15 items-baseline">
        <span className="font-bold">모집 현황</span>
        <div className="flex flex-col gap-5">
          {recruitStatus.map((item) => (
            <RecruitCurrentRow
              key={`recruit-status-${item.field}-${item.recruited}/${item.capacity}`}
              {...item}
            />
          ))}
        </div>
      </section>
      <div className="flex flex-col gap-6">
        <span className="font-bold">기술 스택</span>
        {skills.map((skill) => skill)}
      </div>
      <div className="flex flex-row gap-8">
        <span className="font-bold">오프라인 정기 모임 필수 여부</span>
        {mustOffline}
      </div>
      <div className="flex flex-row gap-16">
        <span className="font-bold">프로젝트 마감 기한</span>
        <span>{deadline}</span>
      </div>
    </div>
  );
}
