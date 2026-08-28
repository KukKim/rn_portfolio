import { i18n } from "@/src/i18n";
import { useNavigation } from "@/src/shared/hooks/navigation";
import {
  CommonHeader,
  CommonSlider,
  ScrollViewContainer,
} from "@kukkim/react-native-ui";
import { StyleSheet } from "react-native";

export default function SliderScreen() {
  const { back } = useNavigation();
  return (
    <ScrollViewContainer>
      <CommonHeader
        left={{
          title: i18n.t("ui.slider"),
          icon: "back",
          onPress: back,
        }}
      />
      <CommonSlider labels={[0, 5, 10]} />
    </ScrollViewContainer>
  );
}

const styles = StyleSheet.create({});
