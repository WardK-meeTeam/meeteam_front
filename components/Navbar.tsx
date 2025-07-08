"use client";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="flex gap-8 justify-between items-baseline w-full pt-9 pl-8 pr-8">
      <div className="flex gap-7 items-baseline">
        <h1 className="text-2xl font-bold cursor-pointer">Meeteam</h1>
        <h2 className="font-semibold cursor-pointer">포트폴리오</h2>
        <h2 className="font-semibold cursor-pointer">프로젝트</h2>
      </div>
      <div className="flex gap-5 mr-12 items-baseline">
        <form
          className="flex justify-between items-center w-[390px] h-[36px] p-2 bg-[#F8F8F8] border border-[#E8E8E8] rounded-2xl"
          onSubmit={() => {
            alert("검색기능 구현 예정");
          }}
        >
          <input
            className="w-full bg-transparent pl-3 outline-none"
            type="text"
            placeholder="검색어를 입력해주세요"
          />
          <button type="submit">
            <Image
              className="m-3 cursor-pointer"
              src="/images/search_icon.svg"
              alt="검색 아이콘"
              width={24}
              height={24}
            />
          </button>
        </form>
        <ul className="flex divide-x-1 divide-[#9C9C9C]">
          <li className="text-[#9C9C9C] cursor-pointer px-2">회원가입</li>
          <li className="text-[#9C9C9C] cursor-pointer px-2">로그인</li>
        </ul>
      </div>
    </header>
  );
}
