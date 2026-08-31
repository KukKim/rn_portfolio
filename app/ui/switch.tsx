import { useNavigation } from "@/src/shared/hooks/navigation";
import { useTranslation } from "@/src/shared/hooks/translation";
import {
  CommonHeader,
  CommonSwitch,
  ScrollViewContainer,
} from "@kukkim/react-native-ui";
import { useState } from "react";
import { StyleSheet } from "react-native";

export default function SwitchScreen() {
  const { t } = useTranslation();
  const { back } = useNavigation();
  const [switchValue, setSwitchValue] = useState(false);
  return (
    <ScrollViewContainer>
      <CommonHeader
        left={{
          title: t("ui.switch"),
          icon: "back",
          onPress: back,
        }}
      />
      <CommonSwitch
        value={switchValue}
        onPress={() => setSwitchValue(!switchValue)}
      />
    </ScrollViewContainer>
  );
}

const styles = StyleSheet.create({});
