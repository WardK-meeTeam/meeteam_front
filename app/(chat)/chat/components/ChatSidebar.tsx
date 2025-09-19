// 읽음 상태 관리 state 만들어서 읽지 않은 상태일 때, NEW 뜨고 색 바뀌게.
// 채팅 기록 보내야 하니 담아서 POST 할 수 있게
"use client";
import NewIcon from "./NewIcon";
import ChatHistory from "./ChatHistory";
import { useEffect, useState } from "react";
import { chatData } from "@/mocks/chatData";
// unread와 read로 나누어야함

export default function ChatSideBar() {
  const [isExistNew, setIsExistNew] = useState(false);
  const unReadChat = chatData.filter((chatData) => chatData.unread === true); // 새로운 채팅기록
  const readChat = chatData.filter((chatData) => chatData.unread === false);
  useEffect(() => {
    if (unReadChat.length !== 0) {
      setIsExistNew(true);
    }
  }, [unReadChat]);
  return (
    <aside className="flex flex-col w-[258px] h-full min-h-0 bg-[#F9FAFA] py-6">
      <div className={isExistNew ? "" : "hidden"}>
        <div className="flex gap-4 items-center">
          <div className="font-bold ml-7.5 text-[#3395F9]">
            {unReadChat.length}개의 미답변 질문
          </div>
          <NewIcon />
        </div>
        <div className="flex flex-col">
          {unReadChat.map((unReadChat) => (
            <ChatHistory key={unReadChat.chatId} {...unReadChat} />
          ))}
        </div>
        <hr className="text-[#EEEEEE] mt-3 mb-6" />
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="font-bold ml-7.5 text-[#3395F9]">채팅 기록</div>
        <div className="flex flex-col">
          {readChat.map((readChat) => (
            <ChatHistory key={readChat.chatId} {...readChat} />
          ))}
        </div>
      </div>
    </aside>
  );
}
