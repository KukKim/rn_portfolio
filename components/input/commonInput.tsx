import { StyleSheet, Text, TextInput, View } from "react-native";
import { InputProps } from "./types";

const CommonInput = ({ title, ...props }: InputProps) => {
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <TextInput style={styles.textInput} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 5,
  },
  textInput: {
    width: "100%",
    padding: 5,
    borderWidth: 1,
    borderRadius: 3,
  },
  title: {
    fontFamily: "Roboto",
    fontWeight: 700,
    fontSize: 12,
  },
});

export default CommonInput;
