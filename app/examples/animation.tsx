import { CommonHeader } from "@/components";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AnimationScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader leftTitle="Animation" backable />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
