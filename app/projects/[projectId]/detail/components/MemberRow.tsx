import Image from "next/image";
import Link from "next/link";

export default function MemberRow({
  imgUrl,
  userName,
  userId,
}: {
  imgUrl: string;
  userName: string;
  userId: string;
}) {
  return (
    <Link
      href={`/users/${userId}`}
      className="flex flex-row gap-2 justify-start items-center cursor-pointer"
    >
      <div className="w-[42px] h-[45px] rounded-full overflow-hidden">
        <Image
          src={imgUrl}
          alt="프로필 이미지"
          width={42}
          height={45}
          className="object-none object-center"
        />
      </div>
      <span className="text-[14px]">{userName}</span>
    </Link>
  );
}
