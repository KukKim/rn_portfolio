import { requestSignin, requestSignup } from "@/src/features/auth";
import { addErrorLog } from "@/src/features/logging";
import { useAppDispatch } from "@/src/hooks/redux";
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
      <CommonText>Login Modal screen</CommonText>
      <CommonInput title={"E-mail"} value={email} onChangeText={setEmail} />
      <CommonInput
        title={"Password"}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <TextButton
          title="Login"
          disabled={!email || !password}
          onPress={handleLogin}
        />
        <TextButton title="Sign Up" onPress={showSignupModal} />
      </View>
      <TextButton title="Guest Login" onPress={handleGuestLogin} />
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
