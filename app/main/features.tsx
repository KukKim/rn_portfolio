import { showToast } from "@/src/features/toast";
import {
  CommonCard,
  CommonHeader,
  SafeAreaContainer,
  TextButton,
} from "@kukkim/react-native-ui";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

export default function Features() {
  const router = useRouter();
  return (
    <SafeAreaContainer>
      <CommonHeader
        left={{
          title: "Features",
        }}
      />
      <CommonCard title={"features"}>
        <TextButton
          title={"fcm"}
          onPress={() => router.navigate("/features/fcm")}
        />
        <TextButton
          title={"image"}
          onPress={() => router.navigate("/features/image")}
        />
        <TextButton
          title={"video"}
          onPress={() => router.navigate("/features/video")}
        />
      </CommonCard>
      <CommonCard title={"Navigation"}>
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
      </CommonCard>
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({});
