export default function MessageBox({
  role,
  content,
  timestamp,
}: {
  role: string;
  content: string;
  timestamp: string;
}) {
  return (
    <div className="flex flex-col">
      <div
        className={`flex ${
          role === "user" ? "justify-end " : "justify-start flex-row-reverse"
        }`}
      >
        <div className="flex-1"></div>
        {/*AI채팅은 왼쪽, 유저 채팅은 오른쪽 정렬용*/}
        <div
          className={`px-6 py-4 ${
            role === "user" ? "bg-[#3395F9] text-white" : "bg-[#F9FAFA]"
          } max-w-[830px] rounded-[8px]`}
        >
          {content}
        </div>
      </div>
      <div
        className={`flex ${role === "user" ? "justify-end " : "justify-start"}`}
      >
        <div className="text-[#979797] text-[14px]">{timestamp}</div>
      </div>
    </div>
  );
}
