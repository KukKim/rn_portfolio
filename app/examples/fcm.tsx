import { CommonButton, CommonHeader } from "@/components";
import { sendPushNotification } from "@/src/features/notification";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FcmScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader leftTitle="Fcm" backable />
      <CommonButton
        title="Send Notification"
        onPress={() =>
          sendPushNotification("ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]")
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
