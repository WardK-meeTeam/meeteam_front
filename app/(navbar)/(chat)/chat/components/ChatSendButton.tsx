import Image from "next/image";

export default function ChatSendButton({ isOnChat }: { isOnChat: boolean }) {
  return (
    <div
      className={`w-[33px] h-[33px] mr-6 rounded-full flex justify-center items-center ${
        isOnChat
          ? "bg-linear-to-r from-mtm-main-blue to-[#D9B5FF]"
          : "bg-mtm-light-gray"
      }`}
    >
      <button disabled={!isOnChat}>
        <Image
          className="w-[19px] h-[21px] cursor-pointer"
          src="/images/chatSendButton.svg"
          alt="검색 아이콘"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
}
