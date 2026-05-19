import { CommonAlert, CommonButton, CommonHeader } from "@/components";
import { showToast } from "@/src/features/toast";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NavigationScreen() {
  const router = useRouter();
  const [alertVisible, setAlertVisible] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      {alertVisible && <CommonAlert />}
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
      <CommonButton
        title={"Show alert modal"}
        onPress={() => {
          router.push({
            pathname: "/alertModal",
            params: { title: "Test title", content: "Test content" },
          });
        }}
      />
      <CommonButton
        title={"Show alert"}
        onPress={() => setAlertVisible(true)}
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
