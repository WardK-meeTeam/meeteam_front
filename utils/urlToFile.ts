export async function urlToFile(url: string, filename = "file"): Promise<File> {
  const res = await fetch(url); // blob: / data: 지원됨 (동일 오리진 필요)
  if (!res.ok) throw new Error("Failed to fetch blob");
  const blob = await res.blob();
  const type = blob.type || "application/octet-stream";
  return new File([blob], filename, { type });
}
