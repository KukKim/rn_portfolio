import { useState } from "react";
import { Image, StyleSheet } from "react-native";
import { CommonImageProps, sizeType } from "./types";

const CommonImage = ({
  type = "primary",
  size = "m",
  ...props
}: CommonImageProps) => {
  const [loading, setLoading] = useState(false);
  return (
    <Image
      style={[styles.container, sizeType[size]]}
      source={require("@/assets/images/defaultImage.png")}
      onLoad={({ nativeEvent }) => {
        console.log("Loading - ");
        console.log(nativeEvent);
      }}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 5,
    borderWidth: 1,
    borderRadius: 3,
  },
});

export default CommonImage;
