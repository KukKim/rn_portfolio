import { i18n } from "@/src/i18n";
import { useNavigation } from "@/src/shared/hooks/navigation";
import {
  CommonBadge,
  CommonHeader,
  NumberBadge,
  ScrollViewContainer,
} from "@kukkim/react-native-ui";
import { StyleSheet } from "react-native";

export default function BadgeScreen() {
  const { back } = useNavigation();
  return (
    <ScrollViewContainer>
      <CommonHeader
        left={{
          title: i18n.t("ui.badge"),
          icon: "back",
          onPress: back,
        }}
      />
      <CommonBadge size="s" typeText="Badge" />
      <CommonBadge size="m" typeText="Badge" type="secondary" />
      <CommonBadge size="l" typeText="Badge" />
      <NumberBadge size="s" number={1} />
      <NumberBadge size="m" number={100} type="secondary" />
      <NumberBadge size="l" number={1000} maxNumber={999} />
    </ScrollViewContainer>
  );
}

const styles = StyleSheet.create({});
