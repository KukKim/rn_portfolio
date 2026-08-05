import { fetchGames } from "@/src/features/game";
import { socket } from "@/src/features/network";
import { useAppSelector } from "@/src/shared/hooks/redux";
import { useQuery } from "@tanstack/react-query";
import { PropsWithChildren, useEffect } from "react";

export const useGames = () => {
  return useQuery({
    queryKey: ["games"],
    queryFn: fetchGames,
  });
};

export function SocketProvider({ children }: PropsWithChildren) {
  const userId = useAppSelector((state) => state.userInfo.id);
  useEffect(() => {
    if (!userId) {
      socket.disconnect();
      return;
    }

    socket.auth = {
      userId,
    };

    socket.connect();

    const handleConnect = () => {
      console.log("socket connected:", socket.id);
    };

    const handleDisconnect = (reason: string) => {
      console.log("socket disconnected:", reason);
    };

    const handleConnectError = (error: Error) => {
      console.error("socket connection error:", error);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("connect_error", handleConnectError);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("connect_error", handleConnectError);

      socket.disconnect();
    };
  }, [userId]);

  return children;
}
