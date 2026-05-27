import { useAppTheme } from "@/src/hooks/theme";
import { StyleSheet, View } from "react-native";
import { CommonText } from "../text";
import {
  NumberBadgeProps,
  expandedSizeType,
  fontSizeType,
  sizeType,
} from "./types";

const NumberBadge = ({
  type = "primary",
  number,
  maxNumber,
  size = "m",
  ...props
}: NumberBadgeProps) => {
  const { theme } = useAppTheme();
  return (
    <View
      style={[
        styles.container,
        maxNumber && number > maxNumber
          ? expandedSizeType[size]
          : sizeType[size],
        { backgroundColor: theme.colors[type].componentBackgroundColor },
      ]}
      {...props}
    >
      <CommonText
        style={[
          styles.innerText,
          fontSizeType[size],
          { color: theme.colors[type].textColor },
        ]}
      >
        {maxNumber && number > maxNumber ? maxNumber + "++" : number}
      </CommonText>
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
    fontSize: 10,
  },
});

export default NumberBadge;
