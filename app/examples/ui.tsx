import {
  Checkbox,
  CircleProgressBar,
  CommonBadge,
  CommonButton,
  CommonCard,
  CommonHeader,
  CommonInput,
  CommonPopOver,
  CommonRating,
  CommonSelect,
  CommonSlider,
  CommonSpinner,
  CommonSwitch,
  CommonText,
  LineProgressBar,
  NumberBadge,
  ScrollViewContainer,
} from "@/components";
import { useState } from "react";
import { StyleSheet } from "react-native";

export default function UIScreen() {
  const [ratingValue, setRatingValue] = useState(3);
  const [switchValue, setSwitchValue] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showPopOver, setShowPopOver] = useState(false);
  return (
    <ScrollViewContainer>
      <CommonHeader leftTitle="UI" backable />
      <CommonCard title={"Badge"}>
        <CommonBadge typeText="1" size={"s"} />
        <CommonBadge type="secondary" typeText="2" size={"m"} />
        <CommonBadge typeText="3" size={"l"} />
        <NumberBadge number={1} size={"s"} />
        <NumberBadge type="secondary" number={10} size={"m"} />
        <NumberBadge number={100} maxNumber={99} size={"l"} />
      </CommonCard>

      <CommonCard title={"Button"}>
        <CommonButton size={"s"} title={"button"} />
        <CommonButton size={"m"} type={"secondary"} title={"button"} />
        <CommonButton size={"l"} title={"button"} />
        <Checkbox size={"s"} />
        <Checkbox size={"m"} />
        <Checkbox size={"l"} />
      </CommonCard>

      <CommonCard title={"Input"}>
        <CommonInput value={inputValue} onChangeText={setInputValue} />
      </CommonCard>

      <CommonCard title={"Pop over"}>
        <CommonButton
          title={"Pop over"}
          onPress={() => setShowPopOver(!showPopOver)}
        />
        {showPopOver && (
          <CommonPopOver>
            <CommonText>{"PopOver"}</CommonText>
          </CommonPopOver>
        )}
      </CommonCard>

      <CommonCard title={"Progress bar"}>
        <CircleProgressBar />
        <LineProgressBar />
      </CommonCard>

      <CommonCard title={"Spinner"}>
        <CommonSpinner />
      </CommonCard>

      <CommonSlider labels={[0, 5, 10]} />
      <CommonRating
        value={ratingValue}
        editable={true}
        onChange={setRatingValue}
      />
      <CommonSelect></CommonSelect>
      <CommonSwitch value={switchValue} onChange={setSwitchValue} />
    </ScrollViewContainer>
  );
}

const styles = StyleSheet.create({});
