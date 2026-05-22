import { CommonText } from "@/components";
import { useAppTheme } from "@/src/styles/ThemeProvider";
import { StyleSheet, TouchableOpacity } from "react-native";
import { CommonButtonProps, fontSizeType } from "./types";

const CommonButton = ({
  title,
  type = "primary",
  size = "m",
  style,
  disabled,
  ...props
}: CommonButtonProps) => {
  const { theme } = useAppTheme();
  return (
    <TouchableOpacity
      style={[
        style,
        styles.container,
        disabled
          ? { borderColor: theme.colors[type].disabledComponentBackground }
          : { borderColor: theme.colors[type].componentBackgroundColor },
      ]}
      {...props}
    >
      <CommonText
        style={[
          styles.innerText,
          fontSizeType[size],
          disabled
            ? { color: theme.colors[type].textColor }
            : { color: theme.colors[type].textColor },
        ]}
      >
        {title}
      </CommonText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 3,
    borderWidth: 1,
  },
  innerText: {
    fontFamily: "Roboto",
  },
});

export default CommonButton;
