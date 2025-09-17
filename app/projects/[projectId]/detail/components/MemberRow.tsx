import Image from "next/image";

export default function MemberRow({
  imgUrl,
  userName,
}: {
  imgUrl: string;
  userName: string;
}) {
  return (
    <div className="flex flex-row gap-2 justify-start items-center cursor-pointer">
      <Image
        src={imgUrl}
        alt="프로필 이미지"
        width={42}
        height={45}
        className="rounded-full"
      />
      <span className="text-[14px]">{userName}</span>
    </div>
  );
}
