import { Pressable, StyleSheet, View } from "react-native";
import { ToggleProps } from "./types";

const CommonToggle = ({ value, onValueChange, ...props }: ToggleProps) => {
  return (
    <Pressable
      style={[
        styles.container,
        value ? { alignItems: "flex-end" } : { alignItems: "flex-start" },
      ]}
      onPress={onValueChange}
    >
      <View style={styles.toggle} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    flexDirection: "row",
    width: 60,
    padding: 5,
    borderWidth: 1,
    borderRadius: 30,
  },
  toggle: {
    borderWidth: 1,
    borderRadius: 15,
    width: 30,
    height: 30,
  },
});

export default CommonToggle;
