import { CommonText } from "@/components";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExamplesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <CommonText>Examples</CommonText>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  settingList: {
    flex: 1,
  },
  settingItem: {
    borderWidth: 1,
    margin: 5,
    padding: 5,
  },
});
