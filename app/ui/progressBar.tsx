import { useNavigation } from "@/src/shared/hooks/navigation";
import {
  CircularProgressBar,
  CommonHeader,
  LinearProgressBar,
  ScrollViewContainer,
} from "@kukkim/react-native-ui";
import { StyleSheet } from "react-native";

export default function ProgressBarScreen() {
  const { back } = useNavigation();
  return (
    <ScrollViewContainer>
      <CommonHeader
        left={{
          title: "ProgressBar",
          icon: "back",
          onPress: back,
        }}
      />
      <LinearProgressBar value={0.3} />
      <CircularProgressBar value={0.5} />
    </ScrollViewContainer>
  );
}

const styles = StyleSheet.create({});
