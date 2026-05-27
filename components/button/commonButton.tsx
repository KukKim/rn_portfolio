import { useAppTheme } from "@/src/hooks/theme";
import { StyleSheet, TouchableOpacity } from "react-native";
import { CommonText } from "../text";
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
          ? { backgroundColor: theme.colors[type].disabledComponentBackground }
          : { backgroundColor: theme.colors[type].componentBackgroundColor },
      ]}
      {...props}
    >
      <CommonText
        style={[
          fontSizeType[size],
          { color: theme.colors[type].innerComponentTextColor },
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
  },
});

export default CommonButton;
