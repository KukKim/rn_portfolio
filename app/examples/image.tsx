import { CommonHeader, CommonImage } from "@/components";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ImageScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader leftTitle="Image" backable />
      <CommonImage
        size="m"
        source={{
          uri: "https://img.freepik.com/free-photo/photorealistic-hummingbird-outdoors-nature_23-2151474112.jpg?semt=ais_hybrid&w=740&q=80", // high quality
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
