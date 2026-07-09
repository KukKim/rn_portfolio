import { useNavigation } from "@/src/shared/hooks/navigation";
import {
  CommonHeader,
  CommonSwitch,
  ScrollViewContainer,
} from "@kukkim/react-native-ui";
import { useState } from "react";
import { StyleSheet } from "react-native";

export default function SwitchScreen() {
  const { back } = useNavigation();
  const [switchValue, setSwitchValue] = useState(false);
  return (
    <ScrollViewContainer>
      <CommonHeader
        left={{
          title: "Switch",
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
