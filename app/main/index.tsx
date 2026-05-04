import { CommonButton, CommonHeader } from "@/components";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader leftTitle="Home" />
      <CommonButton
        title={"navigation"}
        onPress={() => router.navigate("/examples/navigation")}
      />
      <CommonButton
        title={"default animation"}
        onPress={() => router.navigate("/examples/animation")}
      />
      <CommonButton
        title={"video"}
        onPress={() => router.navigate("/examples/video")}
      />
      <CommonButton
        title={"image"}
        onPress={() => router.navigate("/examples/image")}
      />
      <CommonButton
        title={"fcm"}
        onPress={() => router.navigate("/examples/fcm")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  link: {
    paddingTop: 20,
    fontSize: 20,
  },
});
