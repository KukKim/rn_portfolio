import { useNavigation } from "@/src/shared/hooks/navigation";
import {
  CommonHeader,
  CommonSpinner,
  ScrollViewContainer,
} from "@kukkim/react-native-ui";
import { StyleSheet } from "react-native";

export default function SpinnerScreen() {
  const { back } = useNavigation();
  return (
    <ScrollViewContainer>
      <CommonHeader
        left={{
          title: "Spinner",
          icon: "back",
          onPress: back,
        }}
      />
      <CommonSpinner />
    </ScrollViewContainer>
  );
}

const styles = StyleSheet.create({});
