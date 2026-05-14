import { CommonButton, CommonHeader } from "@/components";
import { showToast } from "@/src/features/toast";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NavigationScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader leftTitle="Navigation" backable />
      <CommonButton
        title="Show Toast"
        onPress={() =>
          showToast({
            type: "success",
            title: "Test Toast",
            message: "This is a toast message",
          })
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  link: {
    paddingTop: 20,
    fontSize: 20,
  },
});
