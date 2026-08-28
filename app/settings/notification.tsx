import { i18n } from "@/src/i18n";
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
          title: i18n.t("settings.notification"),
          icon: "back",
          onPress: back,
        }}
      />
      <CommonText>{i18n.t("settings.notification")}</CommonText>
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({});
