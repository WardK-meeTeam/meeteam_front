export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  console.log(params);
  const { id } = await params;
  return <main>{id}번 id의채팅</main>;
}
