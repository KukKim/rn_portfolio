import { StyleSheet, Text, View } from "react-native";
import { CardProps, contentContainerType, titleContainerType } from "./types";

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
