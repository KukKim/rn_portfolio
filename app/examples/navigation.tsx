import { showToast } from "@/src/features/toast";
import { useNavigation } from "@/src/hooks/navigation";
import {
  CommonHeader,
  SafeAreaContainer,
  TextButton,
} from "@kukkim/react-native-ui";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

export default function NavigationScreen() {
  const router = useRouter();
  const { back } = useNavigation();
  return (
    <SafeAreaContainer>
      <CommonHeader
        left={{
          title: "Navigation",
          icon: "back",
          onPress: back,
        }}
      />
      <TextButton
        title="Show Toast"
        onPress={() =>
          showToast({
            type: "success",
            title: "Test Toast",
            message: "This is a toast message",
          })
        }
      />
      <TextButton
        title={"Show alert modal"}
        onPress={() => {
          router.push({
            pathname: "/alertModal",
            params: { title: "Test title", content: "Test content" },
          });
        }}
      />
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({
  link: {
    paddingTop: 20,
    fontSize: 20,
  },
});
