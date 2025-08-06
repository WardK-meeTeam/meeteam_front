import Chat from "@/app/(chat)/chat/components/Chat";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // 여기서 resolve() or reject() 값이 id로 들어감
  return <Chat id={id} />;
}
