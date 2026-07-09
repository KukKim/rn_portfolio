import { useNavigation } from "@/src/shared/hooks/navigation";
import {
  CommonHeader,
  CommonText,
  SafeAreaContainer,
} from "@kukkim/react-native-ui";
import { StyleSheet } from "react-native";

export default function NotificationScreen() {
  const { back } = useNavigation();
  return (
    <SafeAreaContainer>
      <CommonHeader
        left={{
          title: "Notification",
          icon: "back",
          onPress: back,
        }}
      />
      <CommonText>Notification</CommonText>
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({});
