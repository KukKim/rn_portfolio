import { useTranslation } from "@/src/shared/hooks/translation";
import {
  CommonCard,
  CommonHeader,
  ScrollViewContainer,
  TextButton,
} from "@kukkim/react-native-ui";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

export default function UIKit() {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <ScrollViewContainer>
      <CommonHeader
        left={{
          title: t("ui.title"),
        }}
      />
      <CommonCard title={"Components"}>
        <TextButton
          title={t("ui.button")}
          onPress={() => router.navigate("/ui/button")}
        />
        <TextButton
          title={t("ui.badge")}
          onPress={() => router.navigate("/ui/badge")}
        />
        <TextButton
          title={t("ui.input")}
          onPress={() => router.navigate("/ui/input")}
        />
        <TextButton
          title={t("ui.card")}
          onPress={() => router.navigate("/ui/card")}
        />
        <TextButton
          title={t("ui.progressbar")}
          onPress={() => router.navigate("/ui/progressBar")}
        />
        <TextButton
          title={t("ui.checkbox")}
          onPress={() => router.navigate("/ui/checkbox")}
        />
        <TextButton
          title={t("ui.spinner")}
          onPress={() => router.navigate("/ui/spinner")}
        />
        <TextButton
          title={t("ui.switch")}
          onPress={() => router.navigate("/ui/switch")}
        />
        <TextButton
          title={t("ui.rating")}
          onPress={() => router.navigate("/ui/rating")}
        />
        <TextButton
          title={t("ui.select")}
          onPress={() => router.navigate("/ui/select")}
        />
        <TextButton
          title={t("ui.slider")}
          onPress={() => router.navigate("/ui/slider")}
        />
      </CommonCard>
    </ScrollViewContainer>
  );
}

const styles = StyleSheet.create({});
