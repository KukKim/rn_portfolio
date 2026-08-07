import {
  addChat,
  getChatReadStates,
  getChatRooms,
  getChats,
} from "@/src/features/chat";
import { socket } from "@/src/features/network";
import {
  type InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect } from "react";
import { ChatMessage, ChatMessagePage } from "../types/chat";

export interface ChatReadState {
  userId: string;
  lastReadMessageId: string | null;
}

export interface ChatReadEvent {
  roomId: string;
  userId: string;
  lastReadMessageId: string;
}

interface SendChatRequest {
  roomId: string;
  senderId: string;
  message: string;
  messageType?: "text" | "image" | "video" | "file" | "system";
}

const CHAT_PAGE_SIZE = 30;

export const chatQueryKeys = {
  all: ["chat"] as const,
  rooms: () => [...chatQueryKeys.all, "rooms"] as const,
  messages: () => [...chatQueryKeys.all, "messages"] as const,
  roomMessages: (roomId: string) =>
    [...chatQueryKeys.messages(), roomId] as const,
  readStates: (roomId: string) =>
    [...chatQueryKeys.all, "readStates", roomId] as const,
};

export const useChatRooms = () => {
  return useQuery({
    queryKey: chatQueryKeys.rooms(),
    queryFn: getChatRooms,
  });
};

export const useChats = (roomId?: string) => {
  return useInfiniteQuery({
    queryKey: chatQueryKeys.roomMessages(roomId ?? ""),
    queryFn: ({ pageParam }) => {
      if (!roomId) {
        throw new Error("roomId is required");
      }

      return getChats({
        roomId,
        cursor: pageParam,
        limit: CHAT_PAGE_SIZE,
      });
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor ?? undefined;
    },

    enabled: Boolean(roomId),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnReconnect: true,
  });
};

export const useSendChat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: SendChatRequest) => addChat(request),
    // onSuccess: (createdMessage: ChatMessage, variables) => {
    //   const queryKey = chatQueryKeys.roomMessages(variables.roomId);
    //   queryClient.setQueryData<InfiniteData<ChatMessagePage>>(
    //     queryKey,
    //     (oldData) => {
    //       if (!oldData) {
    //         return {
    //           pages: [
    //             {
    //               messages: [createdMessage],
    //               nextCursor: null,
    //             },
    //           ],
    //           pageParams: [undefined],
    //         };
    //       }

    //       return {
    //         ...oldData,
    //         pages: oldData.pages.map((page, index) => {
    //           if (index !== 0) {
    //             return page;
    //           }
    //           return {
    //             ...page,
    //             messages: [createdMessage, ...page.messages],
    //           };
    //         }),
    //       };
    //     },
    //   );
    // },
  });
};

//TODO: network 가 끊기는 것을 고려하여 수정이 필요함.
export function useChatSocket(roomId?: string, userId?: string) {
  const queryClient = useQueryClient();
  useEffect(() => {
    if (!roomId || !userId) {
      return;
    }
    socket.emit("chat:join", {
      roomId,
      userId,
    });

    const handleNewMessage = (newMessage: ChatMessage) => {
      if (String(newMessage.room_id) !== String(roomId)) {
        return;
      }

      queryClient.setQueryData<InfiniteData<ChatMessagePage>>(
        chatQueryKeys.roomMessages(roomId),
        (oldData) => {
          if (!oldData) {
            return {
              pages: [
                {
                  messages: [newMessage],
                  nextCursor: null,
                },
              ],
              pageParams: [undefined],
            };
          }

          const alreadyExists = oldData.pages.some((page) =>
            page.messages.some(
              (message) => String(message.id) === String(newMessage.id),
            ),
          );

          if (alreadyExists) {
            return oldData;
          }

          const [firstPage, ...remainingPages] = oldData.pages;

          if (!firstPage) {
            return {
              ...oldData,
              pages: [
                {
                  messages: [newMessage],
                  nextCursor: null,
                },
              ],
            };
          }

          socket.emit("chat:read", {
            roomId: newMessage.room_id,
            userId: newMessage.sender_id,
            lastReadMessageId: newMessage.id,
          });

          return {
            ...oldData,
            pages: [
              {
                ...firstPage,
                messages: [newMessage, ...firstPage.messages],
              },
              ...remainingPages,
            ],
          };
        },
      );
    };

    const handleRead = (event: ChatReadEvent) => {
      if (String(event.roomId) !== String(roomId)) {
        return;
      }

      queryClient.setQueryData<ChatReadState[]>(
        chatQueryKeys.readStates(roomId),
        (oldData = []) => {
          const existingState = oldData.find(
            (state) => String(state.userId) === String(event.userId),
          );

          if (!existingState) {
            return [
              ...oldData,
              {
                userId: String(event.userId),
                lastReadMessageId: String(event.lastReadMessageId),
              },
            ];
          }

          return oldData.map((state) => {
            if (String(state.userId) !== String(event.userId)) {
              return state;
            }

            /*
             * BIGINT를 Number로 변환하지 않고 BigInt로 비교합니다.
             */

            const previousId = state.lastReadMessageId
              ? BigInt(state.lastReadMessageId)
              : 0n;
            const receivedId = BigInt(event.lastReadMessageId);
            if (receivedId <= previousId) {
              return state;
            }
            return {
              ...state,
              lastReadMessageId: String(event.lastReadMessageId),
            };
          });
        },
      );
    };

    socket.on("chat:message", handleNewMessage);
    socket.on("chat:read", handleRead);

    return () => {
      socket.emit("chat:leave", {
        roomId,
      });

      socket.off("chat:message", handleNewMessage);
    };
  }, [roomId, userId, queryClient]);
}

export const useChatReadStates = (roomId?: string) => {
  return useQuery({
    queryKey: chatQueryKeys.readStates(roomId ?? ""),
    queryFn: () => {
      if (!roomId) {
        throw new Error("roomId is required");
      }
      return getChatReadStates(roomId);
    },
    enabled: Boolean(roomId),
    staleTime: Infinity,
  });
};
