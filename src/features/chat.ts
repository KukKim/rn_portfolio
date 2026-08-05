// chatApi.ts
import type { Auth } from "@/src/shared/types/auth";
import type {
  ChatMessage,
  ChatMessagePage,
  ChatRoom,
} from "@/src/shared/types/chat";
import { apiRequest, ApiResponse } from "./network";

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

export const createChatRoom = async (
  userInfo: Auth,
): Promise<CreateChatRoomData> => {
  const response = await apiRequest<
    ApiResponse<CreateChatRoomData>,
    CreateChatRoomRequest
  >("/addChatRoom", {
    method: "POST",
    body: {
      title: "testTitle",
      userId: userInfo.id,
    },
  });

  return response.data;
};

export const getChatRooms = async (): Promise<ChatRoom[]> => {
  const response = await apiRequest<ApiResponse<ChatRoom[]>>("/getChatRooms");

  return response.data;
};

export const joinChatRoom = async (
  userId: string,
  roomId: string,
): Promise<JoinChatRoomData> => {
  const response = await apiRequest<
    ApiResponse<JoinChatRoomData>,
    JoinChatRoomRequest
  >("/joinChatRoom", {
    method: "POST",
    body: {
      roomId,
      userId,
    },
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
// export const addChat = (chat: ChatMessage) => {
//   return async (dispatch: AppDispatch) => {
//     const sendingChat: ChatMessage = {
//       ...chat,
//       status: "sending",
//     };

//     dispatch(addMessage(sendingChat));

//     try {
//       await delay(1500);

//       const isSuccess = Math.random() > 0.3;

//       if (!isSuccess) {
//         throw new Error("Failed to send message");
//       }

//       dispatch(
//         updateMessage({
//           ...sendingChat,
//           status: "sent",
//         }),
//       );
//     } catch {
//       dispatch(
//         updateMessage({
//           ...sendingChat,
//           status: "failed",
//         }),
//       );
//     }
//   };
// };

export const getChats = async ({
  roomId,
  cursor,
  limit = 30,
}: {
  roomId: string;
  cursor?: string;
  limit?: number;
}): Promise<ChatMessagePage> => {
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
