import { useNavigation } from "@/src/shared/hooks/navigation";
import { useTranslation } from "@/src/shared/hooks/translation";
import {
  CommonHeader,
  SafeAreaContainer,
  TextButton,
  useTheme,
} from "@kukkim/react-native-ui";
import { StyleSheet } from "react-native";

export default function ThemeScreen() {
  const { t } = useTranslation();
  const { back } = useNavigation();
  const { setMode } = useTheme();
  return (
    <SafeAreaContainer>
      <CommonHeader
        left={{
          title: t("settings.theme.title"),
          icon: "back",
          onPress: back,
        }}
      />
      <TextButton
        title={t("settings.theme.lightMode")}
        onPress={() => setMode("light")}
      />
      <TextButton
        title={t("settings.theme.darkMode")}
        onPress={() => setMode("dark")}
      />
      {/* <TextButton
        title={t('settings.theme.systemMode')}
        onPress={() => updateTheme("system")}
      /> */}
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({});
