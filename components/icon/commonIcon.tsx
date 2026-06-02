import { useAppTheme } from "@/src/hooks/theme";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet, View } from "react-native";
import { IconProps } from "./types";

const CommonIcon = ({
  iconType,
  size = 24,
  color = "black",
  ...props
}: IconProps) => {
  const { theme } = useAppTheme();
  const Icon = () => {
    if (iconType === "setting") {
      return (
        <Feather name="settings" size={size} color={theme.colors.borderColor} />
      );
    } else if (iconType === "search") {
      return (
        <Feather name="search" size={size} color={theme.colors.borderColor} />
      );
    } else if (iconType === "check") {
      return (
        <Feather name="check" size={size} color={theme.colors.borderColor} />
      );
    } else if (iconType === "spinner") {
      return (
        <EvilIcons
          name="spinner-3"
          size={size}
          color={theme.colors.borderColor}
        />
      );
    } else if (iconType == "back") {
      return (
        <Feather
          name="arrow-left"
          size={size}
          color={theme.colors.borderColor}
        />
      );
    } else if (iconType == "facebook") {
      return (
        <FontAwesome
          name="facebook"
          size={size}
          color={theme.colors.borderColor}
        />
      );
    } else if (iconType == "apple") {
      return (
        <FontAwesome
          name="apple"
          size={size}
          color={theme.colors.borderColor}
        />
      );
    } else if (iconType == "google") {
      return (
        <FontAwesome
          name="google"
          size={size}
          color={theme.colors.borderColor}
        />
      );
    } else if (iconType === "close") {
      return <Feather name="x" size={size} color={theme.colors.borderColor} />;
    } else if (iconType === "tune") {
      return <MaterialIcons name="tune" size={24} color="black" />;
    } else if (iconType === "star_empty") {
      return <FontAwesome name="star-o" size={24} color="black" />;
    } else if (iconType === "star_half") {
      return <FontAwesome name="star-half-empty" size={24} color="black" />;
    } else if (iconType === "star_full") {
      return <FontAwesome name="star" size={24} color="black" />;
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
