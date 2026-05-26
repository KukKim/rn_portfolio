import { CommonButton, CommonHeader } from "@/components";
import { useAppTheme } from "@/src/hooks/theme";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ThemeScreen() {
  const { mode, updateTheme } = useAppTheme();
  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader leftTitle="Theme" backable />
      <CommonButton title="라이트 모드" onPress={() => updateTheme("light")} />
      <CommonButton title="다크 모드" onPress={() => updateTheme("dark")} />
      <CommonButton
        title="시스템 설정 따르기"
        onPress={() => updateTheme("system")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
