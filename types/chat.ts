export type ChatType = {
  chatId: string;
  title: string;
  description: string;
  unread: boolean;
  messages: ChatMessage[];
};

// 여기부터 API용

// 1. 채팅 페이지 Side bar에서 사용할 채팅방 요약정보 타입
export interface ChatHistorySummary {
  id: number; // 예: 3 -> 이게 아마 채팅방id일듯?
  name: string; // 예: "PR Review: wowow wowowo"
  description: string | null; // null 가능
  prId: number | null; // null 가능
  prTitle: string | null; // null 가능
  prNumber: number | null; // null 가능
  projectId: number | null; // null 가능
  projectName: string | null; // null 가능
  creatorId: number | null; // null 가능
  lastMessage: string | null; // null 가능
  createdAt: string;
  lastMessageTime: string | null; // null 가능
}

// 2. 채팅방 내부에서 사용할 메세지 하나하나의 타입
export interface ChatMessage {
  id: number;
  chatRoomId: number | null;
  senderId: number | null;
  senderName: string | null;
  senderProfileImage: string | null;
  content: string;
  messageType: "SYSTEM" | "TEXT" | "IMAGE" | "FILE" | "MENTION";
  createdAt: string;
  editedAt: string | null;
  isEdited: boolean;
  isDeleted: boolean;
  mentionedUserIds: number[] | null;
}
