export type ChatMessage = {
  role: "user" | "ai";
  content: string;
  timestamp: string;
};

export type ChatType = {
  chatId: string;
  title: string;
  description: string;
  unread: boolean;
  messages: ChatMessage[];
};
