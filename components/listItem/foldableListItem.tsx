import { useAppTheme } from "@/src/hooks/theme";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { CommonText } from "../text";
import { CommonListItemProps } from "./types";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const FolableListItem = ({
  children,
  style,
  title,
  type = "primary",
  ...props
}: CommonListItemProps) => {
  const { theme } = useAppTheme();
  const [open, setOpen] = useState(false);
  return (
    <AnimatedPressable
      onPress={() => setOpen(!open)}
      style={[
        styles.container,
        { backgroundColor: theme.colors[type].componentBackgroundColor },
      ]}
      layout={LinearTransition.duration(200)}
    >
      <CommonText isInner={true}>{title}</CommonText>
      {open && (
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          {children}
        </Animated.View>
      )}
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    gap: 20,
  },
  innerText: {
    fontFamily: "Roboto",
  },
});

export default FolableListItem;
