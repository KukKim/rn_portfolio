import { CommonHeader, CommonText, SafeAreaContainer } from "@/components";
import { StyleSheet } from "react-native";

export default function LanguageScreen() {
  return (
    <SafeAreaContainer>
      <CommonHeader leftTitle="Language" backable />
      <CommonText>Language</CommonText>
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
