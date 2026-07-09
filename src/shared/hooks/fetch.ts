import { fetchGames } from "@/src/features/game";
import { useQuery } from "@tanstack/react-query";

export const useGames = () => {
  return useQuery({
    queryKey: ["games"],
    queryFn: fetchGames,
  });
};
