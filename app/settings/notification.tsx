import { CommonHeader, CommonText, SafeAreaContainer } from "@/components";
import { StyleSheet } from "react-native";

export default function NotificationScreen() {
  return (
    <SafeAreaContainer>
      <CommonHeader leftTitle="Notification" backable />
      <CommonText>Notification</CommonText>
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({});
