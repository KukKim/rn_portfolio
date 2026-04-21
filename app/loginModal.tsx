import { CommonButton, CommonInput } from "@/components";
import SocialLoginButton from "@/components/button/socailLoginButton";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function LoginModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={styles.container}>
      <Text>Login Modal screen</Text>
      <CommonInput title={"E-mail"} value={email} onChangeText={setEmail} />
      <CommonInput
        title={"Password"}
        value={password}
        onChangeText={setPassword}
      />
      <CommonButton title="Login" />
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
});
