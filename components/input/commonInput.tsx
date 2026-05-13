import { StyleSheet, Text, TextInput, View } from "react-native";
import { InputProps, containerType, warningContainerType } from "./types";

const CommonInput = ({ title, warningText, ...props }: InputProps) => {
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <TextInput
        style={[
          styles.textInput,
          warningText
            ? warningContainerType[props.type || "primary"]
            : containerType[props.type || "primary"],
        ]}
        autoCapitalize="none"
        {...props}
      />
      {warningText && <Text style={styles.warningTitle}>{warningText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 5,
  },
  textInput: {
    height: 30,
    padding: 0,
    // margin: 0,
    borderWidth: 1,
    borderRadius: 3,
  },
  title: {
    fontFamily: "Roboto",
    fontWeight: 700,
    fontSize: 12,
  },
  warningTitle: {
    fontFamily: "Roboto",
    color: "#FF0000",
    fontWeight: 700,
    fontSize: 12,
  },
});

export default CommonInput;
