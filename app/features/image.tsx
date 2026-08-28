import { i18n } from "@/src/i18n";
import { useNavigation } from "@/src/shared/hooks/navigation";
import {
  CommonHeader,
  CommonImage,
  SafeAreaContainer,
} from "@kukkim/react-native-ui";
import { StyleSheet } from "react-native";

export default function ImageScreen() {
  const { back } = useNavigation();
  return (
    <SafeAreaContainer>
      <CommonHeader
        left={{
          title: i18n.t("feature.image"),
          icon: "back",
          onPress: back,
        }}
      />
      <CommonImage
        size="m"
        source={{
          uri: "https://img.freepik.com/free-photo/photorealistic-hummingbird-outdoors-nature_23-2151474112.jpg?semt=ais_hybrid&w=740&q=80", // high quality
        }}
      />
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({});
