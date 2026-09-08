import { apiRequest } from "../features/network";
// import { addLog } from "./logging";

interface UploadUrl {
  fileName: string;
  fileType: string;
}

export const requestUploadUrl = <TResponse>(
  fileName: string,
  fileType: string,
): Promise<TResponse> => {
  return apiRequest<TResponse, UploadUrl>("/upload", {
    method: "POST",
    body: {
      fileName,
      fileType,
    },
  });
};
