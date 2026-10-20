import { requestSignin, requestSignup } from "@/src/features/auth";
import { addErrorLog } from "@/src/features/logging";
import { useAppDispatch } from "@/src/shared/hooks/redux";
import { useTranslation } from "@/src/shared/hooks/translation";
import { updateUserInfo } from "@/src/store/userInfoSlice";
import {
  CommonInput,
  CommonText,
  SocialLoginButton,
  TextButton,
} from "@kukkim/react-native-ui";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  revocationEndpoint:
    "https://github.com/settings/connections/applications/Ov23lijV25sOirDe3M6k",
};

export default function LoginModal() {
  const { t } = useTranslation();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    requestSignin({ email, password })
      .then((response) => {
        if (response?.success) {
          // router.dismiss();
          dispatch(
            updateUserInfo({
              ...response.data,
              email: email,
            }),
          );
        }
      })
      .catch(() => {
        Alert.alert("Login Failed", "Something wrong");
      });
  };

  const handleGuestLogin = () => {
    requestSignup({
      accountType: "GUEST",
    }).then((response) => {
      if (response?.success) {
        // router.dismiss();
        dispatch(updateUserInfo(response.data));
      } else {
        if (response?.status === 500) {
          addErrorLog(
            new Error(`Server error during signup: ${response.message}`),
          );
          Alert.alert("Signup Failed", "Something wrong.");
        } else {
          addErrorLog(new Error(`Server not respond`));
          Alert.alert("Server not respond");
        }
      }
    });
  };

  const showSignupModal = () => {
    router.dismiss();
    router.push("/signUpModal");
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: "Ov23lijV25sOirDe3M6k",
      scopes: ["identity"],
      redirectUri: makeRedirectUri({
        scheme: "rnportfolio",
        path: "auth/github",
      }),
    },
    discovery,
  );

  const handleSocialLogin = (provider: string) => {
    if (provider === "github") {
      promptAsync();
    } else if (provider === "google") {
    } else {
      console.log("Provider login attempt for:", provider);
    }
  };

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      console.log("response:", response);
    }
  }, [response]);

  return (
    <View className="flex-1">
      <CommonText>{t("auth.loginTitle")}</CommonText>
      <CommonInput
        title={t("common.email")}
        value={email}
        onChangeText={setEmail}
      />
      <CommonInput
        title={t("auth.password")}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View className="flex-row">
        <TextButton
          title={t("auth.login")}
          disabled={!email || !password}
          onPress={handleLogin}
        />
        <TextButton title={t("auth.signup")} onPress={showSignupModal} />
      </View>
      <TextButton title={t("auth.guestLogin")} onPress={handleGuestLogin} />
      <SocialLoginButton provider="apple" />
      <SocialLoginButton provider="facebook" />
      <SocialLoginButton provider="google" />
      <SocialLoginButton provider="naver" />
      <SocialLoginButton
        provider="github"
        onPress={() => handleSocialLogin("github")}
      />
    </View>
  );
}
