import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { CommonIcon } from "../icon";
import {
  containerType,
  disabledContainerType,
  disabledTextType,
  fontSizeType,
  SocialLoginButtonProps,
  textType,
} from "./types";

const SocialLoginButton = ({
  type = "primary",
  size = "m",
  style,
  provider,
  disabled,
  ...props
}: SocialLoginButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        style,
        styles.container,
        disabled ? disabledContainerType[type] : containerType[type],
      ]}
      {...props}
    >
      <CommonIcon iconType={provider} size={24} color={"black"} />
      <Text
        style={[
          styles.innerText,
          fontSizeType[size],
          disabled ? disabledTextType[type] : textType[type],
        ]}
      >
        {"Login with " + provider}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 3,
    gap: 10,
    alignItems: "center",
  },
  innerText: {
    fontFamily: "Roboto",
  },
});

export default SocialLoginButton;
