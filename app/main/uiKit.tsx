import { i18n } from "@/src/i18n";
import {
  CommonCard,
  CommonHeader,
  ScrollViewContainer,
  TextButton,
} from "@kukkim/react-native-ui";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

export default function UIKit() {
  const router = useRouter();
  return (
    <ScrollViewContainer>
      <CommonHeader
        left={{
          title: i18n.t("ui.title"),
        }}
      />
      <CommonCard title={"Components"}>
        <TextButton
          title={i18n.t("ui.button")}
          onPress={() => router.navigate("/ui/button")}
        />
        <TextButton
          title={i18n.t("ui.badge")}
          onPress={() => router.navigate("/ui/badge")}
        />
        <TextButton
          title={i18n.t("ui.input")}
          onPress={() => router.navigate("/ui/input")}
        />
        <TextButton
          title={i18n.t("ui.card")}
          onPress={() => router.navigate("/ui/card")}
        />
        <TextButton
          title={i18n.t("ui.progressbar")}
          onPress={() => router.navigate("/ui/progressBar")}
        />
        <TextButton
          title={i18n.t("ui.checkbox")}
          onPress={() => router.navigate("/ui/checkbox")}
        />
        <TextButton
          title={i18n.t("ui.spinner")}
          onPress={() => router.navigate("/ui/spinner")}
        />
        <TextButton
          title={i18n.t("ui.switch")}
          onPress={() => router.navigate("/ui/switch")}
        />
        <TextButton
          title={i18n.t("ui.rating")}
          onPress={() => router.navigate("/ui/rating")}
        />
        <TextButton
          title={i18n.t("ui.select")}
          onPress={() => router.navigate("/ui/select")}
        />
        <TextButton
          title={i18n.t("ui.slider")}
          onPress={() => router.navigate("/ui/slider")}
        />
      </CommonCard>
    </ScrollViewContainer>
  );
}

const styles = StyleSheet.create({});
