import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { CommonIcon } from "../icon";
import { SpinnerProps } from "./types";

const CommonSpinner = ({ ...props }: SpinnerProps) => {
  const rotateValue = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotateValue.value}deg` }],
  }));

  React.useEffect(() => {
    rotateValue.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1, // infinite
      false
    );
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[animatedStyles]}>
        <CommonIcon iconType="spinner" />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
  },
});

export default CommonSpinner;
