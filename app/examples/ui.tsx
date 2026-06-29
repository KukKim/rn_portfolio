import { useNavigation } from "@/src/hooks/navigation";
import {
  CheckBox,
  CircularProgressBar,
  CommonBadge,
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
  LinearProgressBar,
  NumberBadge,
  ScrollViewContainer,
  SelectItem,
  TextButton,
} from "@kukkim/react-native-ui";
import { useState } from "react";
import { StyleSheet } from "react-native";

export default function UIScreen() {
  const { back } = useNavigation();
  const [ratingValue, setRatingValue] = useState(3);
  const [switchValue, setSwitchValue] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showPopOver, setShowPopOver] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  return (
    <ScrollViewContainer>
      <CommonHeader
        left={{
          title: "UI",
          icon: "back",
          onPress: back,
        }}
      />
      <CommonCard title={"Badge"}>
        <CommonBadge typeText="1" size={"s"} />
        <CommonBadge type="secondary" typeText="2" size={"m"} />
        <CommonBadge typeText="3" size={"l"} />
        <NumberBadge number={1} size={"s"} />
        <NumberBadge type="secondary" number={10} size={"m"} />
        <NumberBadge number={100} maxNumber={99} size={"l"} />
      </CommonCard>

      <CommonCard title={"Button"}>
        <TextButton size={"s"} title={"button"} />
        <TextButton size={"m"} type={"secondary"} title={"button"} />
        <TextButton size={"l"} title={"button"} />
        <CheckBox
          size={"s"}
          value={checkbox}
          onPress={() => setCheckbox(!checkbox)}
        />
        <CheckBox
          size={"m"}
          value={checkbox}
          onPress={() => setCheckbox(!checkbox)}
        />
        <CheckBox
          size={"l"}
          value={checkbox}
          onPress={() => setCheckbox(!checkbox)}
        />
      </CommonCard>

      <CommonCard title={"Input"}>
        <CommonInput value={inputValue} onChangeText={setInputValue} />
      </CommonCard>

      <CommonCard title={"Pop over"}>
        <TextButton
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
        <CircularProgressBar value={0.9} />
        <LinearProgressBar value={0.3} />
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
      <CommonSelect>
        <SelectItem value={"1"} label={"item 1"} />
        <SelectItem value={"2"} label={"item 2"} />
        <SelectItem value={"3"} label={"item 3"} />
      </CommonSelect>
      <CommonSwitch value={switchValue} onChange={setSwitchValue} />
    </ScrollViewContainer>
  );
}

const styles = StyleSheet.create({});
