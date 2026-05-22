import { CommonHeader, CommonText } from "@/components";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LanguageScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader leftTitle="Language" backable />
      <CommonText>Language</CommonText>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
