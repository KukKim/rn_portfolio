import { CommonText } from "@kukkim/react-native-ui";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function KeyboardModal() {
  const router = useRouter();

  const dismissModal = () => {
    router.dismiss();
  };
  return (
    <View>
      <CommonText>Keyboard Modal</CommonText>
    </View>
  );
}
