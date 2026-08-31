import { showToast } from "@/src/features/toast";
import { useTranslation } from "@/src/shared/hooks/translation";
import {
  CommonCard,
  CommonHeader,
  SafeAreaContainer,
  TextButton,
} from "@kukkim/react-native-ui";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

export default function Features() {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <SafeAreaContainer>
      <CommonHeader
        left={{
          title: t("feature.title"),
        }}
      />
      <CommonCard title={t("feature.title")}>
        <TextButton
          title={t("feature.fcm")}
          onPress={() => router.navigate("/features/fcm")}
        />
        <TextButton
          title={t("feature.image")}
          onPress={() => router.navigate("/features/image")}
        />
        <TextButton
          title={t("feature.video")}
          onPress={() => router.navigate("/features/video")}
        />
      </CommonCard>
      <CommonCard title={t("feature.naviagation")}>
        <TextButton
          title={t("feature.toast")}
          onPress={() =>
            showToast({
              type: "success",
              title: "Test Toast",
              message: "This is a toast message",
            })
          }
        />
        <TextButton
          title={t("feature.alert")}
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
