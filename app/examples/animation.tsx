import { useNavigation } from "@/src/hooks/navigation";
import { CommonHeader, SafeAreaContainer } from "@kukkim/react-native-ui";
import { StyleSheet } from "react-native";

export default function AnimationScreen() {
  const { back } = useNavigation();

  return (
    <SafeAreaContainer>
      <CommonHeader
        left={{
          title: "Animation",
          icon: "back",
          onPress: back,
        }}
      />
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({});
