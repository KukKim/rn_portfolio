import { CommonHeader, SafeAreaContainer } from "@/components";
import { StyleSheet } from "react-native";

export default function AnimationScreen() {
  return (
    <SafeAreaContainer>
      <CommonHeader leftTitle="Animation" backable />
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({});
