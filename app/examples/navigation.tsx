import {
  CommonAlert,
  CommonButton,
  CommonHeader,
  SafeAreaContainer,
} from "@/components";
import { showToast } from "@/src/features/toast";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";

export default function NavigationScreen() {
  const router = useRouter();
  const [alertVisible, setAlertVisible] = useState(false);
  return (
    <SafeAreaContainer>
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
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({
  link: {
    paddingTop: 20,
    fontSize: 20,
  },
});
