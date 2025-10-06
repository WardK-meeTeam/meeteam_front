"use client";

import Image from "next/image";
import Link from "next/link";
import ArrowIcon from "@/public/images/right_arrow_icon.svg";
import { authFetch } from "@/api/authFetch";

export default function MemberRow({
  imgUrl,
  userName,
  userId,
  canEject = false,
  projectId,
  onUpdate,
}: {
  imgUrl: string;
  userName: string;
  userId: string;
  canEject?: boolean;
  projectId: string;
  onUpdate?: () => void;
}) {
  // 프로젝트 수정 페이지에서 사용할 사용자 추방 로직
  const handleClickEject = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const ok = confirm("정말로 추방하시겠습니까?");
    if (ok) {
      try {
        const response = await authFetch(`/api/project-members`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            memberId: userId,
            projectId: projectId,
          }),
        });
        if (response.ok) {
          console.log("추방 완료");
          if (onUpdate) {
            onUpdate();
          }
        } else {
          alert("멤버 추방에 실패하였습니다.");
        }
      } catch (error) {
        alert(`추방 실패 : ${error}`);
      }
    }
  };
  return (
    <div className="flex flex-row gap-2 justify-start items-center">
      <Link
        href={`/users/${userId}`}
        className="flex flex-row gap-2 justify-start items-center cursor-pointer
                transition-all duration-200 ease-in-out transform hover:scale-105"
      >
        <div className="w-[45px] h-[45px] rounded-full overflow-hidden">
          <Image
            src={imgUrl}
            alt="프로필 이미지"
            width={45}
            height={45}
            className="object-cover object-center w-full h-full"
          />
        </div>
        <span className="text-[14px]">{userName}</span>
      </Link>
      {canEject && (
        <button
          type="button"
          onClick={handleClickEject}
          className="flex gap-2 justify-start items-center text-[14px] rounded-xs
        text-mtm-main-red
        transition-all duration-200 ease-in-out transform hover:bg-gray-100"
        >
          추방 <Image src={ArrowIcon} alt="arrow" width={8} height={12} />
        </button>
      )}
    </div>
  );
}
