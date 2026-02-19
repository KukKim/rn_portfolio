import { StyleSheet, View } from "react-native";
import { CommonPopOverProps } from "./types";

const CommonPopOver = ({
  children,
  type = "primary",
  ...props
}: CommonPopOverProps) => {
  return (
    <View>
      <View style={styles.container}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "gray",
    position: "absolute",
    padding: 10,
  },
});

export default CommonPopOver;
