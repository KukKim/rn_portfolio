import { CommonText } from "@kukkim/react-native-ui";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function KeyboardModal() {
  const router = useRouter();

  const dismissModal = () => {
    router.dismiss();
  };
  return (
    <View style={styles.container}>
      <CommonText>Keyboard Modal</CommonText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: 100,
  },
  buttonContainer: {
    flexDirection: "row",
  },
});
