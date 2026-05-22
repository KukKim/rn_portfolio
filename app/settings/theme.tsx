import { CommonButton, CommonHeader } from "@/components";
import { useAppTheme } from "@/src/styles/ThemeProvider";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ThemeScreen() {
  const { mode, setMode } = useAppTheme();
  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader leftTitle="Theme" backable />
      <CommonButton title="라이트 모드" onPress={() => setMode("light")} />
      <CommonButton title="다크 모드" onPress={() => setMode("dark")} />
      <CommonButton
        title="시스템 설정 따르기"
        onPress={() => setMode("system")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
