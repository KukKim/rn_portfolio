import { useAppTheme } from "@/src/hooks/theme";
import { StyleSheet, View } from "react-native";
import { CommonText } from "../text";
import { CommonBadgeProps, fontSizeType, sizeType } from "./types";

const CommonBadge = ({
  type = "primary",
  size = "m",
  typeText,
  ...props
}: CommonBadgeProps) => {
  const { theme } = useAppTheme();
  return (
    <View
      style={[
        styles.container,
        sizeType[size],
        { backgroundColor: theme.colors[type].componentBackgroundColor },
      ]}
      {...props}
    >
      {typeText && (
        <CommonText
          style={[
            styles.innerText,
            fontSizeType[size],
            { color: theme.colors[type].innerComponentTextColor },
          ]}
        >
          {typeText}
        </CommonText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "center",
  },
  innerText: {
    fontSize: 20,
  },
});

export default CommonBadge;
