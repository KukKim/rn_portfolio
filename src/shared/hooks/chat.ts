import { addChat, getChatRooms, getChats } from "@/src/features/chat";
import { socket } from "@/src/features/network";
import {
  type InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect } from "react";
import { ChatMessage, ChatMessagePage, ChatRoom } from "../types/chat";

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
  room: (roomId: string) => [...chatQueryKeys.rooms(), roomId] as const,
  roomMessages: (roomId: string) =>
    [...chatQueryKeys.messages(), roomId] as const,
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
      if (String(newMessage.roomId) !== String(roomId)) {
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

          if (userId !== newMessage.senderId) {
            socket.emit("chat:read", {
              roomId: newMessage.roomId,
              userId: newMessage.senderId,
              lastReadMessageId: newMessage.id,
            });
          }

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

      const receivedId = BigInt(event.lastReadMessageId);

      queryClient.setQueryData<ChatRoom[]>(
        chatQueryKeys.rooms(),
        (oldRooms) => {
          if (!oldRooms) {
            return oldRooms;
          }
          return oldRooms.map((room) => {
            if (String(room.id) !== String(event.roomId)) {
              return room;
            }

            let changed = false;

            const members = room.members.map((member) => {
              const previousId =
                member.lastReadMessageId == null
                  ? null
                  : BigInt(member.lastReadMessageId);

              if (previousId !== null && receivedId <= previousId) {
                return member;
              }

              changed = true;

              return {
                ...member,
                lastReadMessageId: String(event.lastReadMessageId),
              };
            });

            return changed ? { ...room, members } : room;
          });
        },
      );
    };

    socket.on(`chat:message`, handleNewMessage);
    socket.on(`chat:read`, handleRead);

    return () => {
      socket.emit("chat:leave", {
        roomId,
      });

      socket.off(`chat:message`, handleNewMessage);
      socket.off(`chat:read`, handleRead);
    };
  }, [roomId, userId, queryClient]);
}
