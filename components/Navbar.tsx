"use client";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인시 디자인 확인용
  const [userName, setUserName] = useState("길동"); // 임시 유저명
  const [search, setSearch] = useState("");

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }
  return (
    <header className="flex gap-8 justify-between items-baseline w-full pt-9 pl-8 pr-8">
      <div className="flex gap-7 items-baseline">
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => alert("MainPage 이동")}
        >
          Meeteam
        </h1>
        <h2
          className="font-semibold cursor-pointer"
          onClick={() => alert("포폴 이동")}
        >
          포트폴리오
        </h2>
        <h2
          className="font-semibold cursor-pointer"
          onClick={() => alert("플젝 이동")}
        >
          프로젝트
        </h2>
      </div>
      <div className="flex gap-5 mr-12 items-baseline">
        <form
          className="flex justify-between items-center w-[390px] h-[36px] p-2 bg-[#F8F8F8] border border-[#E8E8E8] rounded-2xl"
          onSubmit={(e) => {
            e.preventDefault();
            alert("검색어 : " + search);
          }}
        >
          <input
            className="w-full bg-transparent pl-3 outline-none"
            type="text"
            value={search}
            onChange={handleSearchChange}
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
          {isLoggedIn ? (
            <li
              className="text-[#9C9C9C] pl-2"
              onClick={() => setIsLoggedIn(false)}
            >
              <span className="font-bold">{userName}님! </span>
              안녕하세요
            </li>
          ) : (
            <Fragment>
              <li
                className="text-[#9C9C9C] cursor-pointer px-2"
                onClick={() => alert("회원가입 이동")}
              >
                회원가입
              </li>
              <li
                className="text-[#9C9C9C] cursor-pointer px-2"
                onClick={() => {
                  setIsLoggedIn(true);
                }}
              >
                로그인
              </li>
            </Fragment>
          )}
        </ul>
      </div>
    </header>
  );
}
