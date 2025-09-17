// 데이터 주소 File로 변환하는 로직
export const dataURLtoFile = (dataurl: string, filename: string) => {
  const arr = dataurl.split(",");
  if (arr.length < 2) {
    return null;
  }
  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch || mimeMatch.length < 2) {
    return null;
  }
  const mime = mimeMatch[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};
