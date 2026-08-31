import { useNavigation } from "@/src/shared/hooks/navigation";
import { useTranslation } from "@/src/shared/hooks/translation";
import {
  CommonHeader,
  SafeAreaContainer,
  TextButton,
} from "@kukkim/react-native-ui";
import { StyleSheet } from "react-native";

export default function FcmScreen() {
  const { t } = useTranslation();
  const { back } = useNavigation();
  return (
    <SafeAreaContainer>
      <CommonHeader
        left={{
          title: t("feature.fcm"),
          icon: "back",
          onPress: back,
        }}
      />
      <TextButton title="Send Notification" />
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({});
