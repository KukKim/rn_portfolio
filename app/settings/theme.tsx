import { StyleSheet, Text, View } from "react-native";

export default function ThemeScreen() {
  return (
    <View style={styles.container}>
      <Text>Theme</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
