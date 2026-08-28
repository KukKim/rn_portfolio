import { i18n } from "@/src/i18n";
import { useNavigation } from "@/src/shared/hooks/navigation";
import {
  CommonHeader,
  CommonSpinner,
  ScrollViewContainer,
} from "@kukkim/react-native-ui";
import { StyleSheet } from "react-native";

export default function SpinnerScreen() {
  const { back } = useNavigation();
  return (
    <ScrollViewContainer>
      <CommonHeader
        left={{
          title: i18n.t("ui.spinner"),
          icon: "back",
          onPress: back,
        }}
      />
      <CommonSpinner />
    </ScrollViewContainer>
  );
}

const styles = StyleSheet.create({});
