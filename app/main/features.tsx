import { showToast } from "@/src/features/toast";
import { i18n } from "@/src/i18n";
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
          title: i18n.t("feature.title"),
        }}
      />
      <CommonCard title={i18n.t("feature.title")}>
        <TextButton
          title={i18n.t("feature.fcm")}
          onPress={() => router.navigate("/features/fcm")}
        />
        <TextButton
          title={i18n.t("feature.image")}
          onPress={() => router.navigate("/features/image")}
        />
        <TextButton
          title={i18n.t("feature.video")}
          onPress={() => router.navigate("/features/video")}
        />
      </CommonCard>
      <CommonCard title={i18n.t("feature.naviagation")}>
        <TextButton
          title={i18n.t("feature.toast")}
          onPress={() =>
            showToast({
              type: "success",
              title: "Test Toast",
              message: "This is a toast message",
            })
          }
        />
        <TextButton
          title={i18n.t("feature.alert")}
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
