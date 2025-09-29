import { authFetch } from "./authFetch";

// 1. 내 채팅방 목록 조회
export const fetchAllChatrooms = async () => {
  const response = await authFetch(`/api/codereviews/chat/my/chatrooms`);

  if (response.ok) {
    const data = await response.json();
    return {
      success: true,
      data: data,
    };
  } else {
    const errorData = await response.json();
    return {
      success: false,
      data: errorData,
    };
  }
};

// 2. 특정 채팅방의 모든 채팅기록 조회
export const fetchAllMessages = async (chatRoomId: string) => {
  const response = await authFetch(
    `/api/codereviews/chat/chatroom/${chatRoomId}/messages/optimized?page=0&size=50&sort=desc&sort=desc`,
  );
  if (response.ok) {
    const data = await response.json();

    return {
      success: true,
      data: data.result.content,
    };
  } else {
    const errorData = await response.json();

    return {
      success: false,
      error: errorData,
    };
  }
};

// 2. 특정 채팅방의 모든 채팅기록 조회
export const sendMessage = async (chatRoomId: string, message: string) => {
  const response = await authFetch(
    `/api/codereviews/chat/chatroom/${chatRoomId}/messages`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: message,
      }),
    },
  );
  if (response.ok) {
    const data = await response.json();

    return {
      success: true,
      data: data.result.content,
    };
  } else {
    const errorData = await response.json();

    return {
      success: false,
      error: errorData,
    };
  }
};
