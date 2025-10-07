import { EventSourcePolyfill } from "event-source-polyfill";

export const connectSSE = async (
  url: string,
  accessToken: string,
  onSaveData: (data: any) => void,
  onError?: (error: any) => void,
) => {
  // SSE 연결 설정
  const eventSource = new EventSourcePolyfill(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "text/event-stream",
    },
    heartbeatTimeout: 600000,
  });

  // 연결 성공 이벤트
  eventSource.addEventListener("PING", (event: any) => {
    if (event.data === "connected") {
      console.log("알림 SSE 연결 완료!!");
    }
  });

  eventSource.addEventListener("PROJECT_MY_APPLY", (event: any) => {
    const parsedData = JSON.parse(event.data);

    onSaveData((prev: any) => [
      ...prev,
      { ...parsedData.data, type: parsedData.type },
    ]);
  });

  eventSource.addEventListener("PROJECT_APPLY", (event: any) => {
    const parsedData = JSON.parse(event.data);

    onSaveData((prev: any) => [
      ...prev,
      { ...parsedData.data, type: parsedData.type },
    ]);
  });

  eventSource.addEventListener("PROJECT_APPROVE", (event: any) => {
    const parsedData = JSON.parse(event.data);

    onSaveData((prev: any) => [
      ...prev,
      { ...parsedData.data, type: parsedData.type },
    ]);
  });

  eventSource.addEventListener("PROJECT_REJECT", (event: any) => {
    const parsedData = JSON.parse(event.data);

    onSaveData((prev: any) => [
      ...prev,
      { ...parsedData.data, type: parsedData.type },
    ]);
  });

  eventSource.addEventListener("PROJECT_END", (event: any) => {
    const parsedData = JSON.parse(event.data);
    onSaveData((prev: any) => [
      ...prev,
      { ...parsedData.data, type: parsedData.type },
    ]);
  });

  // 에러 처리
  eventSource.onerror = (error) => {
    console.error("SSE Error:", error);

    onError?.(error); // 에러 콜백 호출
    eventSource.close(); // 연결 종료
  };

  return eventSource; // 이벤트 소스 반환
};
