import { CommonHeader, CommonRating, CommonSlider } from "@/components";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UIScreen() {
  const [ratingValue, setRatingValue] = useState(3);
  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader leftTitle="UI" backable />
      <CommonSlider labels={[0, 5, 10]} />
      <CommonRating
        value={ratingValue}
        editable={true}
        onChange={setRatingValue}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
