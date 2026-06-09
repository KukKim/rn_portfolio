import { CommonText, SafeAreaContainer } from "@/components";
import { StyleSheet } from "react-native";

export default function Settings() {
  return (
    <SafeAreaContainer style={styles.container}>
      <CommonText>Setting</CommonText>
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({
  settingList: {
    flex: 1,
  },
  settingItem: {
    borderWidth: 1,
    margin: 5,
    padding: 5,
  },
});
