import { CommonButton, CommonHeader, SafeAreaContainer } from "@/components";
import { useAppTheme } from "@/src/hooks/theme";
import { StyleSheet } from "react-native";

export default function ThemeScreen() {
  const { mode, updateTheme } = useAppTheme();
  return (
    <SafeAreaContainer>
      <CommonHeader leftTitle="Theme" backable />
      <CommonButton title="라이트 모드" onPress={() => updateTheme("light")} />
      <CommonButton title="다크 모드" onPress={() => updateTheme("dark")} />
      <CommonButton
        title="시스템 설정 따르기"
        onPress={() => updateTheme("system")}
      />
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({});
