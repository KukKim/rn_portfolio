import { StyleSheet, TextInput, View } from "react-native";
import { InputProps } from "./types";

const CommonInput = ({ ...props }: InputProps) => {
  return (
    <View style={styles.container}>
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
    margin: 5,
    padding: 5,
    borderWidth: 1,
    borderRadius: 3,
  },
});

export default CommonInput;
