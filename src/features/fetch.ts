import { addErrorLog } from "@/src/features/logging";
import { Platform } from "react-native";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

const API_BASE_URL =
  Platform.OS === "ios" ? "http://localhost:3000" : "http://10.0.2.2:3000";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiRequestOptions<TBody> {
  method?: HttpMethod;
  body?: TBody;
  headers?: HeadersInit;
  signal?: AbortSignal;
}

interface ApiErrorResponse {
  message?: string;
  error?: string;
}

export class ApiError extends Error {
  status: number;
  data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);

    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export async function apiRequest<TResponse, TBody = undefined>(
  endpoint: string,
  options: ApiRequestOptions<TBody> = {},
): Promise<TResponse> {
  const { method = "GET", body, headers, signal } = options;

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: {
        ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    });

    const contentType = response.headers.get("content-type");

    const data = contentType?.includes("application/json")
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      const errorData = data as ApiErrorResponse;

      throw new ApiError(
        errorData?.message ??
          errorData?.error ??
          `API 요청에 실패했습니다. (${response.status})`,
        response.status,
        data,
      );
    }

    return data as TResponse;
  } catch (error) {
    addErrorLog(error);
    throw error;
  }
}
