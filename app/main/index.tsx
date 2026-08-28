import { i18n } from "@/src/i18n";
import { CommonHeader, SafeAreaContainer } from "@kukkim/react-native-ui";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <SafeAreaContainer>
      <CommonHeader
        left={{
          title: i18n.t("home.title"),
        }}
      />
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({});
