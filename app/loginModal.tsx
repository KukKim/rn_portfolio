import { StyleSheet, Text, View } from "react-native";

export default function LoginModal() {
  return (
    <View style={styles.container}>
      <Text>Login Modal screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
