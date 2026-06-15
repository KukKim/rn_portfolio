import { useQuery } from "@tanstack/react-query";
import { fetchGames } from "../features/game";

export const useGames = () => {
  return useQuery({
    queryKey: ["games"],
    queryFn: fetchGames,
  });
};
