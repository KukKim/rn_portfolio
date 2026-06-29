import { useNavigation } from "@/src/hooks/navigation";
import { useAppTheme } from "@/src/hooks/theme";
import {
  CommonHeader,
  SafeAreaContainer,
  TextButton,
} from "@kukkim/react-native-ui";
import { StyleSheet } from "react-native";

export default function ThemeScreen() {
  const { back } = useNavigation();
  const { mode, updateTheme } = useAppTheme();
  return (
    <SafeAreaContainer>
      <CommonHeader
        left={{
          title: "Theme",
          icon: "back",
          onPress: back,
        }}
      />
      <TextButton title="라이트 모드" onPress={() => updateTheme("light")} />
      <TextButton title="다크 모드" onPress={() => updateTheme("dark")} />
      <TextButton
        title="시스템 설정 따르기"
        onPress={() => updateTheme("system")}
      />
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({});
