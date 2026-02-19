import {
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";

type Variant = "primary" | "secondary";

const titleContainerType: Record<Variant, ViewStyle> = {
  primary: { backgroundColor: "#FFC0CB" },
  secondary: { backgroundColor: "#64748b" },
};

const contentContainerType: Record<Variant, ViewStyle> = {
  primary: { backgroundColor: "#FFE4E1" },
  secondary: { backgroundColor: "#64748b" },
};

const titleTextType: Record<Variant, TextStyle> = {
  primary: { color: "#ffffff" },
  secondary: { color: "#ffffff" },
};

const textType: Record<Variant, TextStyle> = {
  primary: { color: "#ffffff" },
  secondary: { color: "#ffffff" },
};

interface CardProps extends ViewProps {
  type?: Variant;
  title?: string;
}

const CommonCard = ({
  children,
  type = "primary",
  title,
  ...props
}: CardProps) => {
  return (
    <View style={styles.container}>
      {title && (
        <View style={[styles.titleContainer, titleContainerType[type]]}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
      )}
      <View style={[styles.contentContainer, contentContainerType[type]]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
  },
  titleContainer: {
    alignSelf: "flex-start",
    borderRadius: 5,
    marginLeft: 5,
    padding: 5,
    zIndex: 1,
  },
  titleText: {
    fontSize: 20,
  },
  contentContainer: {
    borderRadius: 5,
    // flexDirection: "row",
    padding: 10,
  },
});

export default CommonCard;
