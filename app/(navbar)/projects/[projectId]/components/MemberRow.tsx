import Image from "next/image";
import Link from "next/link";
import ArrowIcon from "@/public/images/right_arrow_icon.svg";

export default function MemberRow({
  imgUrl,
  userName,
  userId,
  canEject = false,
}: {
  imgUrl: string;
  userName: string;
  userId: string;
  canEject?: boolean;
}) {
  return (
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
          className="object-none object-center"
        />
      </div>
      <span className="text-[14px]">{userName}</span>
      {canEject && (
        <span
          className="flex gap-2 justify-start items-center text-[14px]
        text-mtm-main-red"
        >
          추방 <Image src={ArrowIcon} alt="arrow" width={8} height={12} />
        </span>
      )}
    </Link>
  );
}
