import { i18n } from "@/src/i18n";
import { useNavigation } from "@/src/shared/hooks/navigation";
import {
  CommonHeader,
  CommonInput,
  ScrollViewContainer,
} from "@kukkim/react-native-ui";
import { StyleSheet } from "react-native";

export default function InputScreen() {
  const { back } = useNavigation();
  return (
    <ScrollViewContainer>
      <CommonHeader
        left={{
          title: i18n.t("ui.input"),
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
