import Image from "next/image";

export default function ChatSendButton({ isOnChat }: { isOnChat: boolean }) {
  return (
    <div className="relative w-[33px] h-[33px] mr-6 rounded-full flex justify-center items-center">
      <div
        className={`absolute inset-0 rounded-full bg-mtm-light-gray transition-opacity duration-200 ease-in-out ${
          isOnChat ? "opacity-0" : "opacity-100"
        }`}
      />

      <div
        className={`absolute inset-0 rounded-full bg-linear-to-r from-mtm-main-blue to-[#D9B5FF] transition-opacity duration-200 ease-in-out ${
          isOnChat ? "opacity-100" : "opacity-0"
        }`}
      />

      <button disabled={!isOnChat} className="relative z-10">
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
