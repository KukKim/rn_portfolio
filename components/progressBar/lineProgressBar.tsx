import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ProgressBarProps } from "./types";

const LineProgressBar = ({ ...props }: ProgressBarProps) => {
  const progressValue = useSharedValue<number>(0);
  const animatedStyles = useAnimatedStyle(() => ({
    width: `${progressValue.value}%`,
  }));

  React.useEffect(() => {
    progressValue.value = withTiming(70, {
      duration: 1000,
      easing: Easing.linear,
    });
  }, []);

  return (
    <View style={styles.container} {...props}>
      <Animated.View
        style={[
          animatedStyles,
          {
            height: 12,
            borderRadius: 3,
            backgroundColor: "red",
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});

export default LineProgressBar;
