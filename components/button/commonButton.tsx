import { StyleSheet, Text, TouchableOpacity } from "react-native";
import {
  CommonButtonProps,
  containerType,
  disabledContainerType,
  disabledTextType,
  fontSizeType,
  textType,
} from "./types";

const CommonButton = ({
  title,
  type = "primary",
  size = "m",
  style,
  disabled,
  ...props
}: CommonButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        style,
        styles.container,
        disabled ? disabledContainerType[type] : containerType[type],
      ]}
      {...props}
    >
      <Text
        style={[
          styles.innerText,
          fontSizeType[size],
          disabled ? disabledTextType[type] : textType[type],
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 3,
  },
  innerText: {
    fontFamily: "Roboto",
  },
});

export default CommonButton;
