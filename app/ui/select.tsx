import { useNavigation } from "@/src/shared/hooks/navigation";
import {
  CommonHeader,
  CommonSelect,
  CommonText,
  ScrollViewContainer,
  SelectItem,
} from "@kukkim/react-native-ui";
import { useState } from "react";
import { StyleSheet } from "react-native";

export default function SelectScreen() {
  const { back } = useNavigation();
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  return (
    <ScrollViewContainer>
      <CommonHeader
        left={{
          title: "Select",
          icon: "back",
          onPress: back,
        }}
      />
      <CommonText>
        Selected Value: {selectedValue ? selectedValue : "None"}
      </CommonText>
      <CommonSelect onChange={(value) => setSelectedValue(value)}>
        <SelectItem value={"1"} label={"item 1"} />
        <SelectItem value={"2"} label={"item 2"} />
        <SelectItem value={"3"} label={"item 3"} />
      </CommonSelect>
    </ScrollViewContainer>
  );
}

const styles = StyleSheet.create({});
