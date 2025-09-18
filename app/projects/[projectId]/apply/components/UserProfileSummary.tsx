"use client";

import { UserProfile } from "@/types/userProfile";
import { Fragment, useEffect, useState } from "react";

export default function UserProfileSummary() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user-storage");
    if (!savedUser) return;
    setUser(JSON.parse(savedUser).state.user);
  }, []);
  return (
    <div className="flex flex-col gap-5">
      <span className="flex justify-between items-center ">
        <b>기본 정보</b>
        {/* <ModifyButton /> */}
      </span>
      <hr className="border-4 border-[#F8F8F8]" />
      <div className="flex flex-col gap-6">
        <span>
          <b className="mr-3">이름</b> {user?.name ?? "-"}
        </span>
        <span>
          <b className="mr-3">나이</b> {user?.age ?? "-"}세
          <b className="ml-4 mr-3">성별</b>
          {user?.gender === "MALE" ? "남성" : "여성"}
        </span>
        <span>
          <b className="mr-3">이메일</b> {user?.email ?? "-"}
        </span>
        <span className="flex flex-row items-center justify-start">
          <h1 className="mr-3 font-semibold">기술스택</h1>
          <div>
            {user &&
              user.skills.map((item, idx) => (
                <Fragment key={`${user.name}-${item.skill}`}>
                  {`${item.skill}${idx !== user.skills.length - 1 ? "," : ""}`}
                </Fragment>
              ))}
          </div>
        </span>
      </div>
    </div>
  );
}
