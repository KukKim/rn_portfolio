import { CommonHeader } from "@/components";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UIScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader leftTitle="UI" backable />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
