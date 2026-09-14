import { useNavigation } from "@/src/shared/hooks/navigation";
import { useTranslation } from "@/src/shared/hooks/translation";
import {
  CommonHeader,
  CommonText,
  SafeAreaContainer,
} from "@kukkim/react-native-ui";

export default function NotificationScreen() {
  const { t } = useTranslation();
  const { back } = useNavigation();
  return (
    <SafeAreaContainer>
      <CommonHeader
        left={{
          title: t("settings.notification"),
          icon: "back",
          onPress: back,
        }}
      />
      <CommonText>{t("settings.notification")}</CommonText>
    </SafeAreaContainer>
  );
}
