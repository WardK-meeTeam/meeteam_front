import { ChatMessage } from "@/types/chat";

interface MessageBoxProps {
  chat: ChatMessage;
}

export default function MessageBox({ chat }: MessageBoxProps) {
  return (
    <div className="flex flex-col">
      <div
        className={`flex ${
          chat.messageType === "SYSTEM"
            ? "justify-start flex-row-reverse"
            : "justify-end "
        }`}
      >
        <div className="flex-1"></div>
        {/*AI채팅은 왼쪽, 유저 채팅은 오른쪽 정렬용*/}
        <div
          className={`px-6 py-4 ${
            chat.messageType === "SYSTEM"
              ? "bg-[#F9FAFA]"
              : "bg-[#3395F9] text-white"
          } max-w-[830px] rounded-[8px]`}
        >
          {chat.content}
        </div>
      </div>
      <div
        className={`flex ${chat.messageType === "SYSTEM" ? "justify-start" : "justify-end"}`}
      >
        <div className="text-[#979797] text-[14px]">
          {new Date(`${chat.createdAt}+00:00`).toLocaleString("ko-KR", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </div>
      </div>
    </div>
  );
}
