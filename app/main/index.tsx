import { CommonButton, CommonHeader } from "@/components";
import { Link, useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader leftTitle="Home" />
      <Link href="/loginModal" style={styles.link}>
        Open modal
      </Link>
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
