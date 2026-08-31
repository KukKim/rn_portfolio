import { useNavigation } from "@/src/shared/hooks/navigation";
import { useTranslation } from "@/src/shared/hooks/translation";
import {
  CommonHeader,
  CommonSelect,
  CommonText,
  SafeAreaContainer,
  SelectItem,
} from "@kukkim/react-native-ui";
import { StyleSheet } from "react-native";

export default function LanguageScreen() {
  const { back } = useNavigation();
  const { t, locale, changeLanguage } = useTranslation();

  return (
    <SafeAreaContainer>
      <CommonHeader
        left={{
          title: t("settings.language"),
          icon: "back",
          onPress: back,
        }}
      />
      <CommonText>{t("settings.language")}</CommonText>
      <CommonText>{locale}</CommonText>
      <CommonSelect onChange={changeLanguage}>
        <SelectItem value={"en"} label={"English"} />
        <SelectItem value={"ko"} label={"한국어"} />
      </CommonSelect>
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
