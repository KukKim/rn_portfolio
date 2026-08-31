import { useNavigation } from "@/src/shared/hooks/navigation";
import { useTranslation } from "@/src/shared/hooks/translation";
import {
  CommonCard,
  CommonHeader,
  CommonText,
  FoldableCard,
  ScrollViewContainer,
} from "@kukkim/react-native-ui";
import { useState } from "react";
import { StyleSheet } from "react-native";

export default function CardScreen() {
  const { t } = useTranslation();
  const { back } = useNavigation();
  const [open, setOpen] = useState<boolean>(false);
  return (
    <ScrollViewContainer>
      <CommonHeader
        left={{
          title: t("ui.card"),
          icon: "back",
          onPress: back,
        }}
      />
      <CommonCard title={"Title"}>
        <CommonText>Inner Content</CommonText>
      </CommonCard>
      <FoldableCard value={open} onValueChange={setOpen} title={"Title"}>
        <CommonText>Inner Content</CommonText>
      </FoldableCard>
    </ScrollViewContainer>
  );
}

const styles = StyleSheet.create({});
