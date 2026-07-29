import { Auth } from "./auth";

export interface ChatMessage {
  id: string;
  message: string;
  created_at: Date;
  updated_at?: Date;
  room_id: number;
  isRead: boolean;
  sender_id: number;
  status?: "sending" | "sent" | "failed";
}

export interface ChatMessagePage {
  nextCursor: string | null;
  messages: ChatMessage[];
}

export type DisplayChatMessage = ChatMessage & {
  timeText?: string;
  showTime?: boolean;
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
