import { i18n } from "@/src/i18n";
import { useNavigation } from "@/src/shared/hooks/navigation";
import {
  CommonHeader,
  SafeAreaContainer,
  TextButton,
  useTheme,
} from "@kukkim/react-native-ui";
import { StyleSheet } from "react-native";

export default function ThemeScreen() {
  const { back } = useNavigation();
  const { setMode } = useTheme();
  return (
    <SafeAreaContainer>
      <CommonHeader
        left={{
          title: i18n.t("settings.theme.title"),
          icon: "back",
          onPress: back,
        }}
      />
      <TextButton
        title={i18n.t("settings.theme.lightMode")}
        onPress={() => setMode("light")}
      />
      <TextButton
        title={i18n.t("settings.theme.darkMode")}
        onPress={() => setMode("dark")}
      />
      {/* <TextButton
        title={i18n.t('settings.theme.systemMode')}
        onPress={() => updateTheme("system")}
      /> */}
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({});
