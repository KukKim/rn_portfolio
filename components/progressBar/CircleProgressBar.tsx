import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import { ProgressBarProps } from "./types";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircleProgressBar = ({ ...props }: ProgressBarProps) => {
  const progressValue = useSharedValue<number>(0);
  const size = 100;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  // const animatedStyles = useAnimatedStyle(() => ({
  //   width: `${progressValue.value}%`,
  // }));

  React.useEffect(() => {
    progressValue.value = withTiming(70, {
      duration: 1000,
      easing: Easing.linear,
    });
  }, []);

  return (
    <View style={styles.container} {...props}>
      {/* <Animated.View
        style={[
          animatedStyles,
          {
            height: 12,
            borderRadius: 3,
            backgroundColor: "red",
          },
        ]}
      /> */}

      <Svg width={size} height={size}>
        {/* <Circle cx={size} cy={size} r="45" fill="green" /> */}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#3B82F6"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          // strokeDasharray={circumference}
          // animatedProps={animatedProps}
          // rotation={-90} // 12시 방향부터 시작
          // originX={size / 2}
          // originY={size / 2}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
  },
});

export default CircleProgressBar;
