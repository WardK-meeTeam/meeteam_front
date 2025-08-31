export default function MemberRow({
  imgUrl,
  userName,
}: {
  imgUrl: string;
  userName: string;
}) {
  return (
    <div className="flex flex-row gap-2 justify-start items-center">
      <img
        src={imgUrl}
        alt="프로필 이미지"
        className="w-[42px] h-[45px] rounded-full"
      />
      <span className="text-[14px]">{userName}</span>
    </div>
  );
}
