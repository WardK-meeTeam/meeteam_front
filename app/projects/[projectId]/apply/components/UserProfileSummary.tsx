"use client";

import { useUserStore } from "@/store/userStore";
import { Fragment, useEffect } from "react";

export default function UserProfileSummary() {
  const { user, isLoading, error, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (error) {
    return <div>에러 : {error}</div>;
  }

  return (
    <div className="flex flex-col gap-5">
      <span className="flex justify-between items-center ">
        <b>기본 정보</b>
        {/* <ModifyButton /> */}
      </span>
      <hr className="border-4 border-[#F8F8F8]" />
      <div className="grid grid-cols-[80px_1fr] gap-y-4 gap-x-5">
        <b className="font-bold">이름</b>
        <span>{user?.name ?? "-"}</span>

        <b className="font-bold">나이</b>
        <div>
          <span>{user?.age ?? "-"}세</span>
        </div>

        <b className="font-bold">성별</b>
        <span>{user?.gender === "MALE" ? "남성" : "여성"}</span>

        <b className="font-bold">이메일</b>
        <span>{user?.email ?? "-"}</span>

        <b className="font-bold">기술스택</b>
        <div>
          {user &&
            user.skills.map((item, idx) => (
              <Fragment key={`${user.name}-${item.skill}`}>
                {`${item.skill}${idx !== user.skills.length - 1 ? "," : ""}`}
              </Fragment>
            ))}
        </div>
      </div>
    </div>
  );
}
