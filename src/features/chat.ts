import type {
  ChatMessage,
  ChatMessagePage,
  ChatRoom,
} from "@/src/shared/types/chat";
import { apiRequest, type ApiResponse } from "./network";

interface CreateChatRoomRequest {
  title: string;
  userId: string;
}

interface JoinChatRoomRequest {
  userId: string;
  roomId: string;
}

interface CreateChatRoomData {
  roomId: string;
}

interface JoinChatRoomData {
  roomId: string;
  userId: string;
  joinedAt: string;
}

interface AddChatRequest {
  roomId: string;
  senderId: string;
  message: string;
  messageType?: "text" | "image" | "video" | "file" | "system";
}

interface GetChatsParams {
  roomId: string;
  cursor?: string;
  limit?: number;
}

export interface ChatReadState {
  userId: string;
  joinedAt: string;
  lastReadMessageId: string | null;
}

export const createChatRoom = async (
  request: CreateChatRoomRequest,
): Promise<CreateChatRoomData> => {
  const response = await apiRequest<
    ApiResponse<CreateChatRoomData>,
    CreateChatRoomRequest
  >("/addChatRoom", {
    method: "POST",
    body: request,
  });
  return response.data;
};

export const getChatRooms = async (): Promise<ChatRoom[]> => {
  const response = await apiRequest<ApiResponse<ChatRoom[]>>("/getChatRooms");
  return response.data;
};

export const joinChatRoom = async (
  request: JoinChatRoomRequest,
): Promise<JoinChatRoomData> => {
  const response = await apiRequest<
    ApiResponse<JoinChatRoomData>,
    JoinChatRoomRequest
  >("/joinChatRoom", {
    method: "POST",
    body: request,
  });

  return response.data;
};

export const addChat = async (chat: AddChatRequest): Promise<ChatMessage> => {
  const response = await apiRequest<ApiResponse<ChatMessage>, AddChatRequest>(
    "/addChat",
    {
      method: "POST",
      body: chat,
    },
  );
  return response.data;
};

export const getChats = async ({
  roomId,
  cursor,
  limit = 30,
}: GetChatsParams): Promise<ChatMessagePage> => {
  const searchParams = new URLSearchParams({
    roomId,
    limit: String(limit),
  });

  if (cursor) {
    searchParams.set("cursor", cursor);
  }

  const response = await apiRequest<ApiResponse<ChatMessagePage>>(
    `/getChats?${searchParams.toString()}`,
  );
  return response.data;
};

export const getChatReadStates = async (
  roomId: string,
): Promise<ChatReadState[]> => {
  const searchParams = new URLSearchParams({
    roomId,
  });

  const response = await apiRequest<ApiResponse<ChatReadState[]>>(
    `/getChatReadStates?${searchParams.toString()}`,
  );

  return response.data;
};
