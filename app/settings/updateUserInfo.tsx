import { CommonHeader } from "@/components";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UpdateUserInfoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader leftTitle="UpdateUserInfo" backable />
      <Text>UpdateUserInfo</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
