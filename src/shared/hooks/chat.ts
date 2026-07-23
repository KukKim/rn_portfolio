import { getChatRooms, getChats } from "@/src/features/chat";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

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

// export const useChats = (roomId: number) => {
//   return useQuery({
//     queryKey: ["chats", roomId],
//     queryFn: () => getChats(roomId),
//     enabled: !!roomId,
//   });
// };
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
