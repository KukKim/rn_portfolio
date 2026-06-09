import { CommonHeader, CommonImage, SafeAreaContainer } from "@/components";
import { StyleSheet } from "react-native";

export default function ImageScreen() {
  return (
    <SafeAreaContainer>
      <CommonHeader leftTitle="Image" backable />
      <CommonImage
        size="m"
        source={{
          uri: "https://img.freepik.com/free-photo/photorealistic-hummingbird-outdoors-nature_23-2151474112.jpg?semt=ais_hybrid&w=740&q=80", // high quality
        }}
      />
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({});
