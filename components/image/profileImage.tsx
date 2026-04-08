import { useState } from "react";
import { Image, StyleSheet } from "react-native";
import { CommonSkeleton } from "../skeleton";
import { CommonImageProps, sizeType } from "./types";

const ProfileImage = ({
  type = "primary",
  size = "m",
  ...props
}: CommonImageProps) => {
  const [loading, setLoading] = useState(true);
  return (
    <CommonSkeleton isLoading={loading}>
      <Image
        style={[styles.container, sizeType[size]]}
        source={require("@/assets/images/defaultProfile.png")}
        onLoad={({ nativeEvent }) => {
          setLoading(false);
        }}
        {...props}
      />
    </CommonSkeleton>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 5,
    borderRadius: 3,
  },
});

export default ProfileImage;
