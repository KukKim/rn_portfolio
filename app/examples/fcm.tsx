import { CommonButton, CommonHeader, SafeAreaContainer } from "@/components";
import { StyleSheet } from "react-native";

export default function FcmScreen() {
  return (
    <SafeAreaContainer>
      <CommonHeader leftTitle="Fcm" backable />
      <CommonButton title="Send Notification" />
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({});
