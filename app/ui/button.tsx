import { useNavigation } from "@/src/hooks/navigation";
import {
  CommonButton,
  CommonHeader,
  CommonIcon,
  ScrollViewContainer,
  SocialLoginButton,
  TextButton,
} from "@kukkim/react-native-ui";
import { StyleSheet } from "react-native";

export default function ButtonScreen() {
  const { back } = useNavigation();
  return (
    <ScrollViewContainer>
      <CommonHeader
        left={{
          title: "Button",
          icon: "back",
          onPress: back,
        }}
      />
      <CommonButton>
        <CommonIcon iconType="settings" />
      </CommonButton>
      <TextButton title="Button" size="s" />
      <TextButton title="Button" size="m" type="secondary" />
      <TextButton title="Button" size="l" />
      <SocialLoginButton provider="apple" />
      <SocialLoginButton provider="naver" />
    </ScrollViewContainer>
  );
}

const styles = StyleSheet.create({});
