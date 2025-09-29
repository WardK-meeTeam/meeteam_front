import { Member } from "@/types/projectInfo";
import MemberRow from "./MemberRow";

const NUM_OF_USERIMG = 7; // 프로필 이미지 없을 때 기본 이미지 넣어주는 용도

export default function MemberList({ members }: { members: Member[] }) {
  const leaders = members.filter((member) => member.creator === true);
  const teamMembers = members.filter((member) => member.creator !== true);
  return (
    <div className="flex flex-col gap-8 box-border border border-mtm-light-gray py-5 px-7 rounded-xl w-full">
      <div className="flex flex-col gap-3">
        <span className="font-bold text-lg">팀장</span>
        {leaders.map((person, idx) => (
          <MemberRow
            key={`project-detail-leader-${person.memberId}`}
            userId={person.memberId.toString()}
            imgUrl={
              person.imageUrl ??
              `/images/userImg${(idx % NUM_OF_USERIMG) + 1}.png`
            }
            userName={person.name}
          />
        ))}
      </div>
      {teamMembers.length > 0 && (
        <>
          <div className="flex flex-col gap-3">
            <span className="font-bold text-lg">팀원</span>
            {teamMembers.map((person, idx) => (
              <MemberRow
                key={`project-detail-memeber-${person.memberId}`}
                userId={person.memberId.toString()}
                imgUrl={
                  person.imageUrl ??
                  `/images/userImg${(idx % NUM_OF_USERIMG) + 1}.png`
                }
                userName={person.name}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
