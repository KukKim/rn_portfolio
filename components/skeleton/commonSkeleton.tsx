import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { CommonSkeletonProps } from "./types";

const CommonSkeleton = ({
  children,
  type = "primary",
  size = "m",
  isLoading,
  ...props
}: CommonSkeletonProps) => {
  const animatedValue = useSharedValue(0);
  useEffect(() => {
    if (isLoading) {
      animatedValue.value = withRepeat(
        withTiming(1, {
          duration: 1500,
          easing: Easing.bezier(0.4, 0, 0.6, 1),
        }),
        -1,
        false
      );
    } else {
      cancelAnimation(animatedValue);
      animatedValue.value = 0;
    }
  }, [isLoading, animatedValue]);
  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(animatedValue.value, [0, 1], [-100, 100]);
    return {
      transform: [{ translateX: `${translateX}%` as any }],
    };
  });
  return (
    <View style={styles.container}>
      {children}
      {isLoading && (
        <View style={[StyleSheet.absoluteFill, styles.skeletonOverlay]}>
          <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
            <LinearGradient
              colors={[
                "transparent",
                "rgba(255, 255, 255, 0.3)",
                "transparent",
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFill}
            />
          </Animated.View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    overflow: "hidden",
  },
  background: {
    backgroundColor: "#FFFFFF",
  },
  skeletonOverlay: {
    backgroundColor: "#E0E0E0",
  },
});

export default CommonSkeleton;
