import { CommonButton, CommonInput } from "@/components";
import SocialLoginButton from "@/components/button/socailLoginButton";
import { requestSignin } from "@/src/features/auth";
import { useAppDispatch } from "@/src/hooks/redux";
import { updateUserInfo } from "@/src/store/userInfoSlice";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function LoginModal() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    requestSignin({ email, password }).then((response) => {
      if (response?.success) {
        router.dismiss();
        dispatch(
          updateUserInfo({
            ...response.data,
            email: email,
          }),
        );
        router.replace("/main");
      }
    });
  };

  const showSignupModal = () => {
    router.dismiss();
    router.push("/signUpModal");
  };
  return (
    <View style={styles.container}>
      <Text>Login Modal screen</Text>
      <CommonInput title={"E-mail"} value={email} onChangeText={setEmail} />
      <CommonInput
        title={"Password"}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <CommonButton
          title="Login"
          disabled={!email || !password}
          onPress={handleLogin}
        />
        <CommonButton title="Sign Up" onPress={showSignupModal} />
      </View>
      <SocialLoginButton provider="apple" />
      <SocialLoginButton provider="facebook" />
      <SocialLoginButton provider="google" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
  },
});
