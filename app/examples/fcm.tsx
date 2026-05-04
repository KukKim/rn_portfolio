import { CommonHeader } from "@/components";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FcmScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader leftTitle="Fcm" backable />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
