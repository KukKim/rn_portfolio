import { useNavigation } from "@/src/shared/hooks/navigation";
import {
  CommonHeader,
  SafeAreaContainer,
  TextButton,
} from "@kukkim/react-native-ui";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

export default function ListScreen() {
  const { back } = useNavigation();
  const router = useRouter();

  return (
    <SafeAreaContainer>
      <CommonHeader
        left={{
          title: "List",
          icon: "back",
          onPress: back,
        }}
      />
      <TextButton
        title={"portfolio"}
        onPress={() => router.navigate("/examples/list/portfolio")}
      />
      <TextButton
        title={"games"}
        onPress={() => router.navigate("/examples/list/games")}
      />
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({});
