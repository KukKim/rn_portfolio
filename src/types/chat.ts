export interface Chat {
  id: string;
  content: string;
  createDt: Date;
  isRead: boolean;
}

export interface ChatState {
  messages: Chat[];
}
