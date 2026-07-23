import { Auth } from "./auth";

export interface ChatMessage {
  id: string;
  message: string;
  createDt: Date;
  isRead: boolean;
  sender: string;
  status: "sending" | "sent" | "failed";
}

export type DisplayChatMessage = ChatMessage & {
  timeText: string;
  showTime: boolean;
  isMyChat: boolean;
};

export interface ChatMessageState {
  messages: ChatMessage[];
}

export interface ChatRoom {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  members: Auth[];
}
