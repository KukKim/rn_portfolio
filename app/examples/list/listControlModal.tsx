import { Checkbox, CommonSlider, CommonText } from "@/components";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function ListControlModal() {
  const router = useRouter();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const slectableList = [
    {
      value: "Javascript",
      label: "JavaScript",
      disabled: false,
    },
    {
      value: "Python",
      label: "Python",
      disabled: false,
    },
    { value: "Java", label: "Java", disabled: false },
    { value: "React", label: "React", disabled: false },
    { value: "Node.js", label: "Node.js", disabled: false },
    { value: "React native", label: "React native", disabled: false },
  ];
  return (
    <View style={styles.container}>
      <CommonText>Login Modal screen</CommonText>
      <Checkbox.Group
        value={selectedValues}
        onChange={setSelectedValues}
        multiple={true}
      >
        {slectableList.map((item) => (
          <Checkbox
            key={item.value}
            value={item.value}
            label={item.label}
            disabled={item.disabled}
          />
        ))}
      </Checkbox.Group>
      <CommonSlider />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
