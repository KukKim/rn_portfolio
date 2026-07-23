import { Platform } from "react-native";
import { apiRequest } from "../features/fetch";
import type { Auth } from "../shared/types/auth";
import { addLog } from "./logging";

interface CheckTokenRequest {
  token: string;
}

interface RegisterPushTokenRequest {
  id: string;
  authToken: string;
  pushToken: string;
  platform: "ios" | "android";
}

export const requestCheckToken = <TResponse>(
  token: string,
): Promise<TResponse> => {
  return apiRequest<TResponse, CheckTokenRequest>("/check", {
    method: "POST",
    body: {
      token,
    },
  });
};

export const requestSignup = <TResponse>(
  signupData: Auth,
): Promise<TResponse> => {
  addLog({
    title: "Signup Attempt",
  });

  return apiRequest<TResponse, Auth>("/signup", {
    method: "POST",
    body: signupData,
  });
};

// TODO: 후에 POST 로 변경 필요. POST에서 SSL로 변경
export const requestSignin = <TResponse>(
  signinData: Auth,
): Promise<TResponse> => {
  addLog({
    title: "Signin Attempt",
  });

  const params = new URLSearchParams({
    email: signinData.email,
    password: signinData.password,
  });

  return apiRequest<TResponse>(`/signin?${params.toString()}`, {
    method: "GET",
  });
};

export const registerPushToken = <TResponse>(
  authToken: string,
  pushToken: string,
  id: string,
): Promise<TResponse> => {
  return apiRequest<TResponse, RegisterPushTokenRequest>("/registerpushtoken", {
    method: "POST",
    body: {
      id,
      authToken,
      pushToken,
      platform: Platform.OS === "ios" ? "ios" : "android",
    },
  });
};
