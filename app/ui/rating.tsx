import { useNavigation } from "@/src/shared/hooks/navigation";
import { useTranslation } from "@/src/shared/hooks/translation";
import {
  CommonHeader,
  CommonRating,
  ScrollViewContainer,
} from "@kukkim/react-native-ui";
import { useState } from "react";
import { StyleSheet } from "react-native";

export default function RatingScreen() {
  const { t } = useTranslation();
  const { back } = useNavigation();
  const [ratingValue, setRatingValue] = useState(0);
  return (
    <ScrollViewContainer>
      <CommonHeader
        left={{
          title: t("ui.rating"),
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
