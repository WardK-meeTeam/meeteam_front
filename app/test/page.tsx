"use client";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [id, setId] = useState<string>("");
  return (
    <div>
      <Link href={"/signin"} className="text-mtm-main-blue">
        로그인
      </Link>
      <br />
      <Link href={"/signup"} className="text-mtm-main-blue">
        회원가입
      </Link>
      <br />
      <input
        className="border border-mtm-light-gray"
        placeholder="프로젝트 ID (예시 : 1)"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <Link href={`/projects/${id}/detail`} className="text-mtm-main-blue">
        번 프로젝트 상세보기
      </Link>
      <br />
      <Link href={"/projects/create"} className="text-mtm-main-blue">
        플젝 생성하기
      </Link>
    </div>
  );
}
