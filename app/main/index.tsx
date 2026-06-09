import { CommonButton, CommonHeader, SafeAreaContainer } from "@/components";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <SafeAreaContainer>
      <CommonHeader leftTitle="Home" />
      <CommonButton
        title={"navigation"}
        onPress={() => router.navigate("/examples/navigation")}
      />
      <CommonButton
        title={"ui"}
        onPress={() => router.navigate("/examples/ui")}
      />
      <CommonButton
        title={"List"}
        onPress={() => router.navigate("/examples/list")}
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
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({});
