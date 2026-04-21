import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { CommonIcon } from "../icon";
import { fontSizeType, SocialLoginButtonProps, textType } from "./types";

const SocialLoginButton = ({
  type = "primary",
  size = "m",
  style,
  provider,
  ...props
}: SocialLoginButtonProps) => {
  return (
    <TouchableOpacity style={[style, styles.container]} {...props}>
      <CommonIcon iconType={provider} size={24} color={"black"} />
      <Text style={[styles.innerText, fontSizeType[size], textType[type]]}>
        {"Login with " + provider}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 5,
    padding: 5,
    borderWidth: 1,
    borderRadius: 3,
    gap: 10,
    alignItems: "center",
  },
  innerText: {
    fontFamily: "Roboto",
  },
});

export default SocialLoginButton;
