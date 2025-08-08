// 나중에 Date객체로 시간 받아야 할 일 있을 떄 사용할 것
// 결괏값 예시 : 25.07.17 오후 13:00

export default function formatChatDate(date: Date): string {
  const year = String(date.getFullYear()).slice(2); // '24'
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 1~12
  const day = String(date.getDate()).padStart(2, "0");

  let hour = date.getHours();
  const minute = String(date.getMinutes()).padStart(2, "0");

  const ampm = hour < 12 ? "오전" : "오후";
  if (hour === 0)
    hour = 12; // 자정
  else if (hour > 12) hour -= 12;

  return `${year}. ${month}. ${day}. ${ampm} ${hour}:${minute}`;
}
