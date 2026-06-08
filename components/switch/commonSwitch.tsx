import { useAppTheme } from "@/src/hooks/theme";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";
import { SwitchProps, sizeType } from "./types";

export default function CommonSwitch({
  type = "primary",
  size = "m",
  style,
  disabled,
  ...props
}: SwitchProps) {
  const { theme } = useAppTheme();
  const [value, setValue] = useState(false);
  const translateX = useSharedValue(0);
  const sizeValue = sizeType[size];
  const setValueWithAnimation = () => {
    if (value) {
      translateX.value = 0;
    } else {
      translateX.value = sizeValue;
    }
    setValue(!value);
  };

  return (
    <Pressable
      style={[
        {
          width: (sizeValue + 2) * 2,
          height: sizeValue + 2,
          borderRadius: sizeValue / 2 + 1,
        },
        {
          padding: 1,
          justifyContent: "center",
          borderWidth: 1,
          borderColor: theme.colors[type].componentBackgroundColor,
        },
      ]}
      onPress={setValueWithAnimation}
    >
      <Animated.View
        style={[
          {
            width: sizeValue,
            height: sizeValue,
            borderRadius: sizeValue / 2,
          },
          ,
          { backgroundColor: theme.colors[type].componentBackgroundColor },
          { transform: [{ translateX }] },
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {},
});
