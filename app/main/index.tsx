import { useTranslation } from "@/src/shared/hooks/translation";
import { CommonHeader, SafeAreaContainer } from "@kukkim/react-native-ui";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

export default function Index() {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <SafeAreaContainer>
      <CommonHeader
        left={{
          title: t("home.title"),
        }}
      />
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({});
