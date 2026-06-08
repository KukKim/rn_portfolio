import { Platform, StyleSheet, View } from "react-native";
import { CommonAlertProps } from "./types";

// TODO: Alert 구현 필요
const CommonAlert = ({ type = "primary", ...props }: CommonAlertProps) => {
  if (Platform.OS === "ios") {
    // @expo/ui/swiftui 에서 Alert가 deprecated되었기 때문에 대체가 필요함.
    return <View />;
  } else {
    return <View />;
  }
};

const styles = StyleSheet.create({});

export default CommonAlert;
