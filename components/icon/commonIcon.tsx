import AntDesign from "@expo/vector-icons/AntDesign";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, View } from "react-native";
import { IconProps } from "./types";

const CommonIcon = ({
  iconType,
  size = 24,
  color = "black",
  ...props
}: IconProps) => {
  const Icon = () => {
    if (iconType === "setting") {
      return <Feather name="settings" size={size} color="black" />;
    } else if (iconType === "search") {
      return <Feather name="search" size={size} color="black" />;
    } else if (iconType === "check") {
      return <AntDesign name="check" size={size} color="black" />;
    } else if (iconType === "spinner") {
      return <EvilIcons name="spinner-3" size={size} color="black" />;
    } else if (iconType == "back") {
      return <Ionicons name="chevron-back" size={size} color="black" />;
    }
  };
  return (
    <View style={styles.container} {...props}>
      <Icon />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // margin: 5,
    // padding: 5,
  },
});

export default CommonIcon;
