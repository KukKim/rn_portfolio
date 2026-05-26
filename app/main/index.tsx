import { CommonButton, CommonHeader, ScreenContainer } from "@/components";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <ScreenContainer>
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
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({});
