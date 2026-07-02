import { useNavigation } from "@/src/hooks/navigation";
import {
  CommonHeader,
  CommonInput,
  SafeAreaContainer,
  TextButton,
} from "@kukkim/react-native-ui";
import { useState } from "react";
import { KeyboardAvoidingView, ScrollView, StyleSheet } from "react-native";

export default function ChattingScreen() {
  const { back } = useNavigation();
  const [text, setText] = useState("");
  return (
    <SafeAreaContainer>
      <CommonHeader
        left={{
          title: "Chatting",
          icon: "back",
          onPress: back,
        }}
      />
      <ScrollView
        style={{
          flex: 1,
        }}
      ></ScrollView>
      <KeyboardAvoidingView
        behavior="padding"
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <CommonInput value={text} onChangeText={setText} />
        <TextButton title={"Input"} />
      </KeyboardAvoidingView>
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({});
