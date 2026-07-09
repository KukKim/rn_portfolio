export interface ChatMessage {
  id: string;
  content: string;
  createDt: Date;
  isRead: boolean;
  sender: string;
  status: "sending" | "sent" | "failed";
}

export type DisplayChatMessage = ChatMessage & {
  timeText: string;
  showTime: boolean;
};

export interface ChatMessageState {
  messages: ChatMessage[];
}
