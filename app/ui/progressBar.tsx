import { useNavigation } from "@/src/shared/hooks/navigation";
import { useTranslation } from "@/src/shared/hooks/translation";
import {
  CircularProgressBar,
  CommonHeader,
  LinearProgressBar,
  ScrollViewContainer,
} from "@kukkim/react-native-ui";

export default function ProgressBarScreen() {
  const { t } = useTranslation();
  const { back } = useNavigation();
  return (
    <ScrollViewContainer>
      <CommonHeader
        left={{
          title: t("ui.progressBar"),
          icon: "back",
          onPress: back,
        }}
      />
      <LinearProgressBar value={0.3} />
      <CircularProgressBar value={0.5} />
    </ScrollViewContainer>
  );
}
