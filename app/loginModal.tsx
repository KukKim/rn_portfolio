import { requestSignin, requestSignup } from "@/src/features/auth";
import { addErrorLog } from "@/src/features/logging";
import { i18n } from "@/src/i18n";
import { useAppDispatch } from "@/src/shared/hooks/redux";
import { updateUserInfo } from "@/src/store/userInfoSlice";
import {
  CommonInput,
  CommonText,
  SocialLoginButton,
  TextButton,
} from "@kukkim/react-native-ui";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

export default function LoginModal() {
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
  return (
    <View style={styles.container}>
      <CommonText>{i18n.t("auth.loginTitle")}</CommonText>
      <CommonInput
        title={i18n.t("common.email")}
        value={email}
        onChangeText={setEmail}
      />
      <CommonInput
        title={i18n.t("auth.password")}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <TextButton
          title={i18n.t("auth.login")}
          disabled={!email || !password}
          onPress={handleLogin}
        />
        <TextButton title={i18n.t("auth.signup")} onPress={showSignupModal} />
      </View>
      <TextButton
        title={i18n.t("auth.guestLogin")}
        onPress={handleGuestLogin}
      />
      <SocialLoginButton provider="apple" />
      <SocialLoginButton provider="facebook" />
      <SocialLoginButton provider="google" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
  },
});
