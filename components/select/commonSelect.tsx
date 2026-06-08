import { useAppTheme } from "@/src/hooks/theme";
import React, { ReactNode, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { CommonIcon } from "../icon";
import { CommonText } from "../text";

type SelectItemProps = {
  label: string;
  value: string;
};

type CommonSelectProps = {
  value?: string;
  placeholder?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
};

const SelectItem = (_props: SelectItemProps) => {
  return null;
};

function CommonSelectComponent({
  value,
  placeholder = "Select",
  onValueChange,
  children,
}: CommonSelectProps) {
  const { theme } = useAppTheme();
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <Pressable style={styles.button} onPress={() => setVisible(!visible)}>
        <CommonText>{placeholder}</CommonText>
        <CommonIcon iconType="down" size={24} />
      </Pressable>
      <View>
        {visible && (
          <View
            style={{
              position: "absolute",
              width: 100,
              height: 300,
              backgroundColor: "green",
            }}
          ></View>
        )}
      </View>
    </View>
  );
}

const CommonSelect = Object.assign(CommonSelectComponent, {
  Item: SelectItem,
});

export default CommonSelect;

const styles = StyleSheet.create({
  button: { flexDirection: "row" },
});
