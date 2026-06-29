import {
  CommonHeader,
  SafeAreaContainer,
  TextButton,
} from "@kukkim/react-native-ui";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <SafeAreaContainer>
      <CommonHeader
        left={{
          title: "Home",
        }}
      />
      <TextButton
        title={"navigation"}
        onPress={() => router.navigate("/examples/navigation")}
      />
      <TextButton
        title={"ui"}
        onPress={() => router.navigate("/examples/ui")}
      />
      <TextButton
        title={"List"}
        onPress={() => router.navigate("/examples/list")}
      />
      <TextButton
        title={"default animation"}
        onPress={() => router.navigate("/examples/animation")}
      />
      <TextButton
        title={"video"}
        onPress={() => router.navigate("/examples/video")}
      />
      <TextButton
        title={"image"}
        onPress={() => router.navigate("/examples/image")}
      />
      <TextButton
        title={"fcm"}
        onPress={() => router.navigate("/examples/fcm")}
      />
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({});
