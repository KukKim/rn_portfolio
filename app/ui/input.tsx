import { useNavigation } from "@/src/shared/hooks/navigation";
import { useTranslation } from "@/src/shared/hooks/translation";
import {
  CommonHeader,
  CommonInput,
  ScrollViewContainer,
} from "@kukkim/react-native-ui";
import { StyleSheet } from "react-native";

export default function InputScreen() {
  const { t } = useTranslation();
  const { back } = useNavigation();
  return (
    <ScrollViewContainer>
      <CommonHeader
        left={{
          title: t("ui.input"),
          icon: "back",
          onPress: back,
        }}
      />
      <CommonInput />
      <CommonInput title="input" />
      <CommonInput title="input" placeholder="Placeholder" />
    </ScrollViewContainer>
  );
}

const styles = StyleSheet.create({});
