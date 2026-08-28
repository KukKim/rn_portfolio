import { i18n } from "@/src/i18n";
import { useNavigation } from "@/src/shared/hooks/navigation";
import {
  CommonHeader,
  SafeAreaContainer,
  TextButton,
} from "@kukkim/react-native-ui";
import { StyleSheet } from "react-native";

export default function FcmScreen() {
  const { back } = useNavigation();
  return (
    <SafeAreaContainer>
      <CommonHeader
        left={{
          title: i18n.t("feature.fcm"),
          icon: "back",
          onPress: back,
        }}
      />
      <TextButton title="Send Notification" />
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({});
