import { CommonIcon, CommonText } from "@/components";
import { useAppTheme } from "@/src/styles/ThemeProvider";
import { StyleSheet, TouchableOpacity } from "react-native";
import { fontSizeType, SocialLoginButtonProps } from "./types";

const SocialLoginButton = ({
  type = "primary",
  size = "m",
  style,
  provider,
  disabled,
  ...props
}: SocialLoginButtonProps) => {
  const { theme } = useAppTheme();

  return (
    <TouchableOpacity
      style={[
        style,
        styles.container,
        disabled
          ? { backgroundColor: theme.colors[type].disabledComponentBackground }
          : { backgroundColor: theme.colors[type].componentBackgroundColor },
      ]}
      {...props}
    >
      <CommonIcon iconType={provider} size={24} color={"black"} />
      <CommonText
        style={[
          styles.innerText,
          fontSizeType[size],
          disabled
            ? { color: theme.colors[type].textColor }
            : { color: theme.colors[type].textColor },
        ]}
      >
        {"Login with " + provider}
      </CommonText>
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
