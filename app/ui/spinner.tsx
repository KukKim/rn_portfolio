import { useNavigation } from "@/src/shared/hooks/navigation";
import { useTranslation } from "@/src/shared/hooks/translation";
import {
  CommonHeader,
  CommonSpinner,
  ScrollViewContainer,
} from "@kukkim/react-native-ui";

export default function SpinnerScreen() {
  const { t } = useTranslation();
  const { back } = useNavigation();
  return (
    <ScrollViewContainer>
      <CommonHeader
        left={{
          title: t("ui.spinner"),
          icon: "back",
          onPress: back,
        }}
      />
      <CommonSpinner />
    </ScrollViewContainer>
  );
}
