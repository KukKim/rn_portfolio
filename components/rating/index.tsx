import { useAppTheme } from "@/src/hooks/theme";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { CommonIcon } from "../icon";
import { RatingProps } from "./types";

const CommonRating = ({
  type = "primary",
  value,
  onChange,
  editable = false,
  size = 24,
  maxRating = 5,
}: RatingProps) => {
  const { theme } = useAppTheme();
  const renderStar = (index: number) => {
    const starNumber = index + 1;

    let iconType: "star_empty" | "star_half" | "star_full" = "star_empty";

    if (value >= starNumber) {
      iconType = "star_full";
    } else if (value >= starNumber - 0.5) {
      iconType = "star_half";
    }

    if (!editable) {
      return (
        <View key={index}>
          <CommonIcon
            iconType={iconType}
            size={size}
            color={theme.colors[type].componentBackgroundColor}
          />
        </View>
      );
    }

    return (
      <View
        key={index}
        style={{
          width: size,
          height: size,
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CommonIcon
          iconType={iconType}
          size={size}
          color={theme.colors[type].componentBackgroundColor}
        />

        {/* 왼쪽 절반 */}
        <Pressable
          style={[
            StyleSheet.absoluteFillObject,
            {
              width: size / 2,
              left: 0,
            },
          ]}
          onPress={() => {
            onChange?.(index + 0.5);
          }}
        />

        {/* 오른쪽 절반 */}
        <Pressable
          style={[
            StyleSheet.absoluteFillObject,
            {
              width: size / 2,
              left: size / 2,
            },
          ]}
          onPress={() => {
            onChange?.(index + 1);
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: maxRating }).map((_, index) => renderStar(index))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CommonRating;
