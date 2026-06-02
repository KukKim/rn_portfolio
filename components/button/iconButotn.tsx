import { useAppTheme } from "@/src/hooks/theme";
import { Pressable, StyleSheet } from "react-native";
import { CommonIcon } from "../icon";
import { IconButtonProps } from "./types";

const IconButton = ({
  type = "primary",
  size = "m",
  style,
  disabled,
  iconType,
  ...props
}: IconButtonProps) => {
  const { theme } = useAppTheme();
  return (
    <Pressable
      style={[
        style,
        styles.container,
        disabled
          ? { backgroundColor: theme.colors[type].disabledComponentBackground }
          : { backgroundColor: theme.colors[type].componentBackgroundColor },
      ]}
      {...props}
    >
      <CommonIcon
        iconType={iconType}
        color={theme.colors[type].innerComponentTextColor}
        size={24}
      />
    </Pressable>
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

export default IconButton;
