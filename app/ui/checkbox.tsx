import { useNavigation } from "@/src/shared/hooks/navigation";
import { useTranslation } from "@/src/shared/hooks/translation";
import {
  CheckBox,
  CommonHeader,
  ScrollViewContainer,
} from "@kukkim/react-native-ui";
import { useState } from "react";
import { StyleSheet } from "react-native";

export default function CheckboxScreen() {
  const { t } = useTranslation();
  const { back } = useNavigation();
  const [checkbox, setCheckbox] = useState<boolean>(false);
  return (
    <ScrollViewContainer>
      <CommonHeader
        left={{
          title: t("ui.checkbox"),
          icon: "back",
          onPress: back,
        }}
      />
      <CheckBox value={checkbox} onPress={() => setCheckbox(!checkbox)} />
    </ScrollViewContainer>
  );
}

const styles = StyleSheet.create({});
