import { CommonIcon, CommonText } from "@/components";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
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
          <CommonText size="l">{leftTitle}</CommonText>
        </View>
      );
    } else if (leftComponent) {
      return leftComponent;
    }
    return <View></View>;
  };
  const RightComponent = () => {
    if (rightTitle) {
      return <CommonText size={"l"}>{rightTitle}</CommonText>;
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
    alignItems: "center",
    gap: 10,
    justifyContent: "space-between",
  },
  innerContainer: {
    flex: 1,
  },
});

export default CommonHeader;
