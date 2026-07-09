import { useNavigation } from "@/src/shared/hooks/navigation";
import {
  CommonHeader,
  CommonText,
  SafeAreaContainer,
} from "@kukkim/react-native-ui";
import { StyleSheet } from "react-native";

export default function LanguageScreen() {
  const { back } = useNavigation();
  return (
    <SafeAreaContainer>
      <CommonHeader
        left={{
          title: "Language",
          icon: "back",
          onPress: back,
        }}
      />
      <CommonText>Language</CommonText>
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
