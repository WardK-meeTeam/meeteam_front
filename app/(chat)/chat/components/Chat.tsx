"use client";
import { useEffect, useRef, useState } from "react";
import ChatSendButton from "./ChatSendButton";
import MessageBox from "./MessageBox";
import { chatData } from "@/mocks/chatData"; // 임시 채팅내역들

// 채팅 영역 전체 컴포넌트

export default function Chat({ id }: { id: string }) {
  const [inputChat, setInputChat] = useState(""); // input값 확인
  const [isOnChat, setIsOnChat] = useState(false); // 유저가 현재 입력중인지 아닌지 구분하기 위함
  const nowChat = chatData.filter((chatData) => id === chatData.chatId)[0]; // chatData에서 현재 채팅페이지에 해당하는 채팅목록 가져오기
  const nowMessages = nowChat.messages; // 채팅내역 불러오기

  const textareaRef = useRef<HTMLTextAreaElement>(null); // textArea 동적 높이 적용하기 위함
  const scrollWrapRef = useRef<HTMLDivElement>(null); // ✅ 풀폭 스크롤 래퍼
  const chatContainerRef = useRef<HTMLDivElement>(null); // 채팅페이지 들어왔을 때 제일 마지막 채팅으로 자동스크롤 하기 위함

  function handleChangeInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInputChat(e.target.value);
    setIsOnChat(e.target.value.trim() !== "");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // 먼저 초기화
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 내용에 따라 높이 조절
    }
  }

  useEffect(() => {
    // 채팅 페이지 렌더링 되면 스크롤 제일 하단으로 이동되어 있는 채로 보임
    const el = chatContainerRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  });

  return (
    <main className="flex flex-col gap-4 justify-between items-center w-full h-full ">
      <div
        ref={chatContainerRef}
        className="flex flex-col justify-center items-center w-full overflow-y-auto px-20 py-4"
      >
        {/* 채팅 메세지 영역 -> 스크롤 되는 부분*/}
        <div className="flex flex-col gap-10 w-full h-full max-w-[1200px]">
          {nowMessages.map((message) => (
            <MessageBox key={message.content} {...message} />
          ))}
        </div>
      </div>

      {/*form태그(메세지 입력창) -> 스크롤 안 되고 고정되도록 함 */}
      <div className="px-20 w-full flex justify-center">
        <form
          className={`w-full max-w-[1200px] flex items-center justify-between rounded-[8px] border mb-5 ${
            isOnChat ? "border-[#6BB4FF]" : "border-[#D9D9D9]"
          }`}
        >
          <textarea
            ref={textareaRef}
            className="min-w-[350px] max-h-[300px] overflow-y-auto resize-none placeholder:text-[#979797] outline-none flex-1 p-5"
            onChange={handleChangeInput}
            value={inputChat}
            placeholder="변경 목적을 입력하면 자동으로 문서화돼요!"
          />
          <ChatSendButton isOnChat={isOnChat} />
        </form>
      </div>
    </main>
  );
}
