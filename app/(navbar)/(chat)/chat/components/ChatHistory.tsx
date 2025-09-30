// Sidebar에 존재하게 될 채팅 기록 컴포넌트
"use client";
import { ChatHistorySummary } from "@/types/chat";
import { useRouter, useParams } from "next/navigation";

interface ChatHistoryProps {
  chatHistory: ChatHistorySummary;
}
export default function ChatHistory({ chatHistory }: ChatHistoryProps) {
  const router = useRouter();
  const { id } = useParams<{ id: string }>(); // params 객체 반환 -> 현재 URL에서의 id값 읽어와 반환

  // chatId와 id가 같다면 해당 채팅기록이 열려있는 것이므로 Sidebar에 하이라이트 표시 해줌 (hover 했을 때도 마찬가지)
  return (
    <div
      className={`flex flex-col mx-2 px-5.5 py-3 rounded-xl gap-1.5 cursor-pointer
         transition-all duration-200 ease-in-out
        ${
          String(id) === String(chatHistory.id) ? "bg-gray-200" : ""
        } hover:bg-gray-200`}
      onClick={() => {
        router.push(`/chat/${chatHistory.id}`);
      }}
    >
      <div className="font-semibold truncate whitespace-nowrap overflow-hidden">
        {chatHistory.name}
      </div>
      <div className="font-normal text-base truncate whitespace-nowrap overflow-hidden">
        {chatHistory.lastMessage}
      </div>
    </div>
  );
}
