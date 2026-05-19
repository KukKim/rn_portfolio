import { AlertDialog } from "@expo/ui/jetpack-compose";
import { Platform, StyleSheet, View } from "react-native";
import { CommonAlertProps } from "./types";

const CommonAlert = ({ type = "primary", ...props }: CommonAlertProps) => {
  if (Platform.OS === "ios") {
    // @expo/ui/swiftui 에서 Alert가 deprecated되었기 때문에 대체가 필요함.
    return <View />;
  } else {
    return (
      <AlertDialog
        title="Alert Title"
        message="This is an alert message."
        buttons={[
          { text: "OK", onPress: () => console.log("OK Pressed") },
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
        ]}
      />
    );
  }
};

const styles = StyleSheet.create({});

export default CommonAlert;
