import { CommonHeader } from "@/components";
import { ScrollView, StyleSheet, View } from "react-native";

export default function Home() {
  return (
    <ScrollView style={styles.scrollView}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CommonHeader leftTitle="Home" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
});
