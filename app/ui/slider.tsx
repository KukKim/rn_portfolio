import { useNavigation } from "@/src/shared/hooks/navigation";
import { useTranslation } from "@/src/shared/hooks/translation";
import {
  CommonHeader,
  CommonSlider,
  ScrollViewContainer,
} from "@kukkim/react-native-ui";
import { StyleSheet } from "react-native";

export default function SliderScreen() {
  const { t } = useTranslation();
  const { back } = useNavigation();
  return (
    <ScrollViewContainer>
      <CommonHeader
        left={{
          title: t("ui.slider"),
          icon: "back",
          onPress: back,
        }}
      />
      <CommonSlider labels={[0, 5, 10]} />
    </ScrollViewContainer>
  );
}

const styles = StyleSheet.create({});
