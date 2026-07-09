import {
  CommonCard,
  CommonHeader,
  SafeAreaContainer,
  TextButton,
} from "@kukkim/react-native-ui";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

export default function Examples() {
  const router = useRouter();
  return (
    <SafeAreaContainer>
      <CommonHeader
        left={{
          title: "Examples",
        }}
      />
      <CommonCard title={"example"}>
        <TextButton
          title={"chat"}
          onPress={() => router.navigate("/examples/chat")}
        />
        <TextButton
          title={"portfolio"}
          onPress={() => router.navigate("/examples/list/portfolio")}
        />
        <TextButton
          title={"games"}
          onPress={() => router.navigate("/examples/list/games")}
        />
      </CommonCard>
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({});
