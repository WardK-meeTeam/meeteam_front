import Image from "next/image";

export default function ChatSendButton({ isOnChat }: { isOnChat: boolean }) {
  return (
    <div
      className={`w-[33px] h-[33px] mr-6 rounded-full flex justify-center items-center ${
        isOnChat ? "bg-linear-to-r from-[#6BB4FF] to-[#D9B5FF]" : "bg-[#D9D9D9]"
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
