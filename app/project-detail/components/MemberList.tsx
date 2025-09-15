import MemberRow from "./MemberRow";

export default function MemberList() {
  return (
    <div className="flex flex-col gap-8 box-border border border-mtm-light-gray py-5 px-7 rounded-xl">
      <div className="flex flex-col gap-3">
        <span className="font-bold text-lg">팀장</span>
        <MemberRow imgUrl="/images/userImg1.png" userName="정연준" />
        <MemberRow imgUrl="/images/userImg1.png" userName="정연준" />
      </div>
      <div className="flex flex-col gap-3">
        <span className="font-bold text-lg">팀원</span>
        <MemberRow imgUrl="/images/userImg1.png" userName="정연준" />
        <MemberRow imgUrl="/images/userImg2.png" userName="정연준" />
        <MemberRow imgUrl="/images/userImg3.png" userName="정연준" />
        <MemberRow imgUrl="/images/userImg4.png" userName="정연준" />
      </div>
    </div>
  );
}
