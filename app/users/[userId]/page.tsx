import UserClientPage from "./UserClientPage";

export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params; // 여기서 resolve() or reject() 값이 id로 들어감
  return <UserClientPage userId={userId} />;
}
