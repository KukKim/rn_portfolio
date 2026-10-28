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
import * as AppleAuthentication from "expo-apple-authentication";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import { Alert, Platform, View } from "react-native";
import { LoginManager } from "react-native-fbsdk-next";
import {
  GoogleOneTapSignIn,
  isNoSavedCredentialFoundResponse,
  isSuccessResponse,
} from "react-native-nitro-google-signin";

GoogleOneTapSignIn.configure({ webClientId: "autoDetect" });
WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  revocationEndpoint:
    "https://github.com/settings/connections/applications/" +
    process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID,
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
      clientId: process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID,
      scopes: ["identity"],
      redirectUri: makeRedirectUri({
        scheme: "rnportfolio",
        path: "auth/github",
      }),
    },
    discovery,
  );

  const handleSocialLogin = async (provider: string) => {
    if (provider === "github") {
      promptAsync();
    } else if (provider === "google") {
      await GoogleOneTapSignIn.checkPlayServices();

      let response = await GoogleOneTapSignIn.signIn();

      if (isNoSavedCredentialFoundResponse(response)) {
        response = await GoogleOneTapSignIn.createAccount();
      }
      if (isNoSavedCredentialFoundResponse(response)) {
        response = await GoogleOneTapSignIn.presentExplicitSignIn();
      }

      if (isSuccessResponse(response)) {
        const { user, idToken } = response.data;
        // Send idToken to your backend for verification
        console.log(user.email, idToken);
      }
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
      {Platform.OS === "ios" && (
        <SocialLoginButton
          provider="apple"
          onPress={async () => {
            try {
              const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                  AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                  AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
              });
              // signed in
            } catch (e) {
              console.log("Apple sign-in error:", e);
              if (e.code === "ERR_REQUEST_CANCELED") {
                // handle that the user canceled the sign-in flow
              } else {
                // handle other errors
              }
            }
          }}
        />
      )}
      <SocialLoginButton
        provider="facebook"
        onPress={() => {
          LoginManager.logInWithPermissions(["public_profile"]).then(
            function (result) {
              if (result.isCancelled) {
                console.log("Login cancelled");
              } else {
                console.log(
                  "Login success with permissions: " +
                    result.grantedPermissions.toString(),
                );
              }
            },
            function (error) {
              console.log("Login fail with error: " + error);
            },
          );
        }}
      />
      <SocialLoginButton
        provider="google"
        onPress={() => handleSocialLogin("google")}
      />
      <SocialLoginButton provider="naver" />
      <SocialLoginButton
        provider="github"
        onPress={() => handleSocialLogin("github")}
      />
    </View>
  );
}
