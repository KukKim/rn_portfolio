import { StyleSheet, Text, View } from "react-native";

import {
  NumberBadgeProps,
  containerType,
  expandedSizeType,
  fontSizeType,
  sizeType,
  textType,
} from "./types";

const NumberBadge = ({
  type = "primary",
  number,
  maxNumber,
  size = "m",
  ...props
}: NumberBadgeProps) => {
  return (
    <View
      style={[
        styles.container,
        maxNumber && number > maxNumber
          ? expandedSizeType[size]
          : sizeType[size],
        containerType[type],
      ]}
      {...props}
    >
      <Text style={[styles.innerText, fontSizeType[size], textType[type]]}>
        {maxNumber && number > maxNumber ? maxNumber + "++" : number}
      </Text>
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
