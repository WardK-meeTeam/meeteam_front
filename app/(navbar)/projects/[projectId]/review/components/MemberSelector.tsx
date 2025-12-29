import { Member } from "@/types/projectInfo";

export default function MemberSelector({
  members,
  selectedMembers,
  onToggleSelectedMember,
}: {
  members: Member[];
  selectedMembers: string[];
  onToggleSelectedMember: (id: string) => void;
}) {
  return (
    <div> 
      {
        members.map((member) => (
           <div 
             key={member.memberId} 
             className="inline-block mr-8 cursor-pointer group"
             onClick={() => onToggleSelectedMember(member.memberId.toString())}
           >
            <div className="flex items-center">
              <div 
                className="mr-4 bg-center bg-cover rounded-full w-13 h-13"
                style={{ 
                  backgroundImage: `url(${member.imageUrl || '/images/userImg1.png'})` 
                }}
              ></div>
                 <div 
                   className="w-6 h-6 bg-center bg-cover transition-all duration-200 group-hover:!bg-[url('/images/thumbsup_icon_on.png')]"
                 style={{ 
                   backgroundImage: `url(${selectedMembers.includes(member.memberId.toString()) 
                     ? '/images/thumbsup_icon_on.png' 
                     : '/images/thumbsup_icon_off.png'})` 
                 }}
               ></div>
            </div>
            <div className="pr-10 mt-2 w-full text-center">{member.name}</div>
          </div>
        ))
      }
    </div>
  )
}