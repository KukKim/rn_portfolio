import { apiRequest, ApiResponse } from "../features/fetch";

export const fetchGames = async (): Promise<any[]> => {
  const response = await apiRequest<ApiResponse<any[]>>("/getgames");

  return response.data;
};
