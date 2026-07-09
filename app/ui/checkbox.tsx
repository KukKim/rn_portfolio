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
          title: "Checkbox",
          icon: "back",
          onPress: back,
        }}
      />
      <CheckBox value={checkbox} onPress={() => setCheckbox(!checkbox)} />
    </ScrollViewContainer>
  );
}

const styles = StyleSheet.create({});
