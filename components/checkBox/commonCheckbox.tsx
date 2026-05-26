import { useAppTheme } from "@/src/hooks/theme";
import { Pressable, StyleSheet } from "react-native";
import { CommonIcon } from "../icon";
import { CheckBoxProps, checkType, iconSizeType, sizeType } from "./types";

const CommonCheckBox = ({
  children,
  value,
  onValueChange,
  type = "primary",
  size = "m",
  ...props
}: CheckBoxProps) => {
  const { theme } = useAppTheme();
  const handleChange = () => {
    onValueChange?.(!value);
  };

  return (
    <Pressable
      onPress={handleChange}
      style={[
        styles.container,
        sizeType[size],
        { backgroundColor: theme.colors[type].componentBackgroundColor },
      ]}
      {...props}
    >
      {value && (
        <CommonIcon
          iconType="check"
          size={iconSizeType[size]}
          color={checkType[type]}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
  },
});

export default CommonCheckBox;
