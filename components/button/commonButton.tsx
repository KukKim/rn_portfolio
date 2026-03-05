import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { CommonButtonProps, fontSizeType, textType } from "./types";

const CommonButton = ({
  title,
  type = "primary",
  size = "m",
  ...props
}: CommonButtonProps) => {
  return (
    <TouchableOpacity style={styles.container} {...props}>
      <Text style={[styles.innerText, fontSizeType[size], textType[type]]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "auto",
    margin: 5,
    padding: 5,
    borderWidth: 1,
    borderRadius: 3,
  },
  innerText: {
    fontFamily: "Roboto",
  },
});

export default CommonButton;
