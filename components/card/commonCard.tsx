import { useAppTheme } from "@/src/hooks/theme";
import { StyleSheet, View } from "react-native";
import { CommonText } from "../text";
import { CardProps } from "./types";

const CommonCard = ({
  children,
  type = "primary",
  title,
  ...props
}: CardProps) => {
  const { theme } = useAppTheme();
  return (
    <View style={styles.container}>
      {title && (
        <View
          style={[
            styles.titleContainer,
            {
              backgroundColor: theme.colors[type].componentBackgroundColor,
            },
          ]}
        >
          <CommonText style={styles.titleText}>{title}</CommonText>
        </View>
      )}
      <View
        style={[
          styles.contentContainer,
          {
            backgroundColor: theme.colors[type].componentBackgroundColor,
          },
        ]}
      >
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
