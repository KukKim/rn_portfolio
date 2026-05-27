import { CommonIcon, CommonText } from "@/components";
import { useAppTheme } from "@/src/hooks/theme";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SocialLoginButtonProps } from "./types";

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
          ? {
              backgroundColor:
                theme.colors["secondary"].disabledComponentBackground,
            }
          : {
              backgroundColor:
                theme.colors["secondary"].componentBackgroundColor,
            },
      ]}
      {...props}
    >
      <CommonIcon iconType={provider} size={24} color={"black"} />
      <CommonText style={{ color: theme.colors[type].textColor }}>
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
});

export default SocialLoginButton;
