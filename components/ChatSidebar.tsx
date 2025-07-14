// 왼쪽 채팅기록 사이드 바 항목들은 컴포넌트로 구현.
// 읽음 상태 관리 state 만들어서 읽지 않은 상태일 때, NEW 뜨고 색 바뀌게.
// 채팅 내용 길어지면 규격 안에서 스크롤
// 채팅 기록 보내야 하니 담아서 POST 할 수 있게
// 채팅 기록 내용정리 길어지면...으로

function ChatHistory({ title, content }: { title: string; content: string }) {
  return (
    <div className="flex flex-col gap-1.5 pt-1.5 pb-1.5 border">
      <div className="font-semibold">{title}</div>
      <div className="font-normal">{content}</div>
    </div>
  );
}

function NewIcon() {
  return (
    <div className="w-[39px] h-[18px] rounded-2xl text-white text-xs bg-[#FF5F5F] flex justify-center items-center">
      NEW
    </div>
  );
}

function ChatBox({ isUser }: { isUser: Boolean }) {
  <></>;
}

export default function ChatSideBar() {
  return (
    <aside className="w-[258px] h-150 bg-[#F9FAFA]">
      <div className="ml-7.5 mr-7.5">
        <div className="flex gap-4 items-center">
          <div className="font-bold text-[#3395F9]">1개의 미답변 질문</div>
          <NewIcon />
        </div>
        <div className="flex flex-col gap-3">
          <ChatHistory title="리팩토링" content="handleSubmit 함수 분리" />
        </div>
      </div>
      <hr className="text-[#EEEEEE]" />

      <div className="ml-7.5 mr-7.5">
        <div className="font-bold text-[#3395F9]">채팅 기록</div>
        <div className="flex flex-col gap-3">
          <ChatHistory
            title="버그 수정"
            content="로그인 시 리다이렉트 문제 해결"
          />
          <ChatHistory title="UI 개선" content="버튼 색상 변경" />
          <ChatHistory title="버그 수정" content="다크모드 토글 기능 구현" />
        </div>
      </div>
    </aside>
  );
}
