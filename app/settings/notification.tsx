import { CommonHeader } from "@/components";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Notification() {
  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader leftTitle="Notification" backable />
      <Text>Notification</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
