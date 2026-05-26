import { useAppTheme } from "@/src/hooks/theme";
import { StyleSheet, Text } from "react-native";
import { CommonTextProps, fontSizeType } from "./types";

const CommonText = ({
  type = "primary",
  size = "m",
  children,
  style,
  ...props
}: CommonTextProps) => {
  const { theme } = useAppTheme();
  return (
    <Text
      style={[
        styles.innerText,
        fontSizeType[size],
        { color: theme.colors[type].textColor },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 3,
  },
  innerText: {
    fontFamily: "Roboto",
  },
});

export default CommonText;
