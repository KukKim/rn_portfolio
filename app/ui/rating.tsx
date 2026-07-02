import { useNavigation } from "@/src/hooks/navigation";
import {
  CommonHeader,
  CommonRating,
  ScrollViewContainer,
} from "@kukkim/react-native-ui";
import { useState } from "react";
import { StyleSheet } from "react-native";

export default function RatingScreen() {
  const { back } = useNavigation();
  const [ratingValue, setRatingValue] = useState(0);
  return (
    <ScrollViewContainer>
      <CommonHeader
        left={{
          title: "Rating",
          icon: "back",
          onPress: back,
        }}
      />
      <CommonRating
        value={ratingValue}
        onChange={setRatingValue}
        editable={true}
      />
    </ScrollViewContainer>
  );
}

const styles = StyleSheet.create({});
