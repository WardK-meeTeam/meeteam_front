import NotificationBox, { Notification } from "./components/NotificationBox";

const mockNotification: Notification[] = [
  {
    title: "마감일 기준 자동 우선순위 정렬 TODO 앱",
    description: "지원이 완료되었습니다!",
    time: "어제 오전 10:12",
  },
  {
    title: "퍼스널 컬러 기반 화장품 추천 서비스",
    description: "✍️ 리뷰를 기다리는 팀원이 있어요!",
    time: "어제 오전 10:20",
    buttonName: "리뷰 작성하기",
  },
  {
    title: "새 지원",
    description: "🙋‍♂️ 정연준님이 지원했어요",
    time: "어제 오전 10:12",
    buttonName: "지원서 보기",
  },
];

export default function Page() {
  return (
    <div className="flex flex-col gap-14 w-5xl mx-auto mt-10">
      <h1 className="text-4xl font-extrabold">알림</h1>
      <div className="flex flex-col gap-3 w-full">
        {mockNotification.map((noti, idx) => (
          <NotificationBox key={idx} {...noti} />
        ))}
      </div>
    </div>
  );
}
