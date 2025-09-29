"use client";
import { useEffect, useRef, useState } from "react";
import ChatSendButton from "./ChatSendButton";
import MessageBox from "./MessageBox";
import { fetchAllMessages, sendMessage } from "@/api/chat";
import { ChatMessage } from "@/types/chat";

// 채팅 영역 전체 컴포넌트

export default function Chat({ id }: { id: string }) {
  const [inputMessage, setInputMessage] = useState(""); // input값 확인
  const [isOnChat, setIsOnChat] = useState(false); // 유저가 현재 입력중인지 아닌지 구분하기 위함
  const [messages, setMessages] = useState<ChatMessage[]>();
  const [isSending, setIsSending] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null); // textArea 동적 높이 적용하기 위함
  const chatContainerRef = useRef<HTMLDivElement>(null); // 채팅페이지 들어왔을 때 제일 마지막 채팅으로 자동스크롤 하기 위함
  const formRef = useRef<HTMLFormElement>(null);

  const getMessages = async () => {
    try {
      const actionResult = await fetchAllMessages(id);
      if (actionResult.success) {
        setMessages(actionResult.data);
      } else {
        alert(actionResult.error.message);
      }
    } catch (error) {
      alert(`알 수 없는 오류가 발생했습니다.(${error})`);
    }
  };

  function handleChangeInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInputMessage(e.target.value);
    setIsOnChat(e.target.value.trim() !== "");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // 먼저 초기화
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 내용에 따라 높이 조절
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsSending(true);
    try {
      const response = await sendMessage(id, inputMessage);

      if (response.success) {
        // 성공하면 textArea 초기화
        setInputMessage("");
        getMessages();
      } else {
        console.log("메세지 보내기 실패");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSending(false);
    }
  }

  useEffect(() => {
    // 채팅 페이지 렌더링 되면 스크롤 제일 하단으로 이동되어 있는 채로 보임
    const el = chatContainerRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  });

  useEffect(() => {
    getMessages();
  }, [id]);

  if (!messages) return <div>로딩중...</div>;

  return (
    <main className="flex flex-col gap-4 justify-between items-center w-full h-full ">
      <div
        ref={chatContainerRef}
        className="flex flex-col justify-center items-center w-full overflow-y-auto px-20 py-4"
      >
        {/* 채팅 메세지 영역 -> 스크롤 되는 부분*/}
        <div className="flex flex-col gap-10 w-full h-full max-w-[1200px]">
          {messages.map((message) => (
            <MessageBox key={message.id} chat={message} />
          ))}
        </div>
      </div>

      {/*form태그(메세지 입력창) -> 스크롤 안 되고 고정되도록 함 */}
      <div className="px-20 w-full flex justify-center">
        <form
          ref={formRef}
          className={`w-full max-w-[1200px] flex items-center justify-between rounded-[8px] border mb-5 
            transition-all duration-300 ease-in-out
            ${isOnChat ? "border-mtm-main-blue" : "border-mtm-light-gray"}`}
          onSubmit={handleSubmit}
        >
          <textarea
            disabled={isSending}
            ref={textareaRef}
            className="min-w-[350px] max-h-[300px] overflow-y-auto resize-none placeholder:text-[#979797] outline-none flex-1 p-5"
            onChange={handleChangeInput}
            onKeyDown={handleKeyDown}
            value={inputMessage}
            placeholder="변경 목적을 입력하면 자동으로 문서화돼요!"
          />
          <ChatSendButton isOnChat={isOnChat} />
        </form>
      </div>
    </main>
  );
}
