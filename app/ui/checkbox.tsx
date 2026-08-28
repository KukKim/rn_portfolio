import { i18n } from "@/src/i18n";
import { useNavigation } from "@/src/shared/hooks/navigation";
import {
  CheckBox,
  CommonHeader,
  ScrollViewContainer,
} from "@kukkim/react-native-ui";
import { useState } from "react";
import { StyleSheet } from "react-native";

export default function CheckboxScreen() {
  const { back } = useNavigation();
  const [checkbox, setCheckbox] = useState<boolean>(false);
  return (
    <ScrollViewContainer>
      <CommonHeader
        left={{
          title: i18n.t("ui.checkbox"),
          icon: "back",
          onPress: back,
        }}
      />
      <CheckBox value={checkbox} onPress={() => setCheckbox(!checkbox)} />
    </ScrollViewContainer>
  );
}

const styles = StyleSheet.create({});
