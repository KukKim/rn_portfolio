import { ScrollView, StyleSheet, ViewProps } from "react-native";
import SafeAreaContainer from "./SafeAreaContainer";

const ScrollViewContainer = ({ children }: ViewProps) => {
  return (
    <SafeAreaContainer>
      <ScrollView style={[styles.container]}>{children}</ScrollView>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScrollViewContainer;
