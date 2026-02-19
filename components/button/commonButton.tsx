import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

const CommonButton = ({ children, ...props }: TouchableOpacityProps) => {
  return (
    <TouchableOpacity style={styles.container} {...props}>
      {children}
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
});

export default CommonButton;
