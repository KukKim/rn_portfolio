import { CommonIcon } from "@/components/icon";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { HeaderProps } from "./types";

const CommonHeader = ({
  leftComponent,
  leftTitle,
  rightCompnent,
  rightTitle,
  backable = false,
  ...props
}: HeaderProps) => {
  const router = useRouter();
  const LeftCompnont = () => {
    if (leftTitle) {
      return (
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text style={styles.titleText}>{leftTitle}</Text>
        </View>
      );
    } else if (leftComponent) {
      return leftComponent;
    }
    return <View></View>;
  };
  const RightComponent = () => {
    if (rightTitle) {
      return <Text>{rightTitle}</Text>;
    } else if (rightCompnent) {
      return rightCompnent;
    }
    return <View></View>;
  };
  return (
    <View style={styles.container} {...props}>
      {backable && (
        <Pressable onPress={() => router.back()}>
          <CommonIcon iconType="back" size={24} />
        </Pressable>
      )}
      <View style={styles.innerContainer}>
        <View>
          <LeftCompnont />
        </View>
        <View>
          <RightComponent />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  innerContainer: {
    flex: 1,
  },
  titleText: {
    fontFamily: "Roboto",
    fontWeight: 700,
    fontSize: 20,
  },
});

export default CommonHeader;
