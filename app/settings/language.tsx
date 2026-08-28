import { i18n } from "@/src/i18n";
import { useNavigation } from "@/src/shared/hooks/navigation";
import { useAppDispatch, useAppSelector } from "@/src/shared/hooks/redux";
import { setLanguage } from "@/src/store/settingSlice";
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
  const dispatch = useAppDispatch();

  const selectedLanguage = useAppSelector((state) => state.setting.language);

  const onChangeLanguage = (value: string) => {
    i18n.locale = value;
    dispatch(setLanguage(value as "en" | "ko"));
  };

  return (
    <SafeAreaContainer>
      <CommonHeader
        left={{
          title: i18n.t("settings.language"),
          icon: "back",
          onPress: back,
        }}
      />
      <CommonText>{i18n.t("settings.language")}</CommonText>
      <CommonText>{selectedLanguage}</CommonText>
      <CommonSelect onChange={onChangeLanguage}>
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
