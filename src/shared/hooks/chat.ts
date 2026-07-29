import { addChat, getChatRooms, getChats } from "@/src/features/chat";
import {
  type InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { ChatMessage, ChatMessagePage } from "../types/chat";

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
};

export const useChatRooms = () => {
  return useQuery({
    queryKey: ["chatRooms"],
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
    onSuccess: (createdMessage: ChatMessage, variables) => {
      const queryKey = chatQueryKeys.roomMessages(variables.roomId);
      queryClient.setQueryData<InfiniteData<ChatMessagePage>>(
        queryKey,
        (oldData) => {
          if (!oldData) {
            return {
              pages: [
                {
                  messages: [createdMessage],
                  nextCursor: null,
                },
              ],
              pageParams: [undefined],
            };
          }

          return {
            ...oldData,
            pages: oldData.pages.map((page, index) => {
              if (index !== 0) {
                return page;
              }
              return {
                ...page,
                messages: [createdMessage, ...page.messages],
              };
            }),
          };
        },
      );
    },
  });
};
