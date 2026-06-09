import { CommonButton, CommonHeader, SafeAreaContainer } from "@/components";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

export default function ListScreen() {
  const router = useRouter();

  return (
    <SafeAreaContainer>
      <CommonHeader leftTitle="List" backable />
      <CommonButton
        title={"portfolio"}
        onPress={() => router.navigate("/examples/list/portfolio")}
      />
      <CommonButton
        title={"games"}
        onPress={() => router.navigate("/examples/list/games")}
      />
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({});
