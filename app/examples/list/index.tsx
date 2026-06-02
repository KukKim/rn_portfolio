import { CommonButton, CommonHeader } from "@/components";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ListScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader leftTitle="List" backable />
      <CommonButton
        title={"portfolio"}
        onPress={() => router.navigate("/examples/list/portfolio")}
      />
      <CommonButton
        title={"games"}
        onPress={() => router.navigate("/examples/list/games")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
