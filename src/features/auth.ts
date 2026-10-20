import { Platform } from "react-native";
import { apiRequest } from "../features/network";
import type {
  RequestCheckToken,
  RequestSignIn,
  RequestSignUp,
} from "../shared/types/auth";
import { addLog } from "./logging";

interface RegisterPushTokenRequest {
  id: string;
  authToken: string;
  pushToken: string;
  platform: "ios" | "android";
}

interface UpdateUserInfoRequest {
  id: string;
  imgUri?: string;
  name?: string;
  email?: string;
}

export const requestCheckToken = <TResponse>(
  token: string,
): Promise<TResponse> => {
  return apiRequest<TResponse, RequestCheckToken>("/check", {
    method: "POST",
    body: {
      token,
    },
  });
};

export const requestSignup = <TResponse>(
  signupData: RequestSignUp,
): Promise<TResponse> => {
  addLog({
    title: "Signup Attempt",
  });
  return apiRequest<TResponse, RequestSignUp>("/signup", {
    method: "POST",
    body: signupData,
  });
};

// TODO: 후에 POST 로 변경 필요. POST에서 SSL로 변경
export const requestSignin = <TResponse>(
  signinData: RequestSignIn,
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

//TODO: back-end에서 authToken안쓰임
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

export const requestUpdateUserInfo = <TResponse>(
  id: string,
  imgUri?: string,
  name?: string,
  email?: string,
): Promise<TResponse> => {
  return apiRequest<TResponse, UpdateUserInfoRequest>("/updateuserinfo", {
    method: "PATCH",
    body: {
      id,
      imgUri,
      name,
      email,
    },
  });
};

export const requestSocialSignin = <TResponse>(
  signinData: RequestSignIn,
): Promise<TResponse> => {
  addLog({
    title: "Social Signin Attempt",
  });

  const params = new URLSearchParams({
    email: signinData.email,
    password: signinData.password,
  });

  return apiRequest<TResponse>(`/signin?${params.toString()}`, {
    method: "GET",
  });
};
