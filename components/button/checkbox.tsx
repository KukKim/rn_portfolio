import { useAppTheme } from "@/src/hooks/theme";
import { createContext, useContext, useMemo, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { CommonIcon } from "../icon";
import { CommonText } from "../text";
import { CheckboxGroupProps, CheckboxProps } from "./types";

//TODO: Checkbox sizeType 적용필요
type CheckboxGroupContextValue = {
  selectedValues: string[];
  toggleValue: (value: string) => void;
};
const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(
  null,
);

const CheckboxBase = ({
  type = "primary",
  value,
  checked,
  defaultChecked = false,
  onCheckedChange,
  label,
  style,
  disabled = false,
  ...props
}: CheckboxProps) => {
  const { theme } = useAppTheme();
  const group = useContext(CheckboxGroupContext);
  const [innerChecked, setInnerChecked] = useState(defaultChecked);
  const isInGroup = !!group && !!value;
  const isChecked = isInGroup
    ? group.selectedValues.includes(value)
    : (checked ?? innerChecked);

  const handlePress = () => {
    if (disabled) return;
    if (isInGroup) {
      group.toggleValue(value);
      return;
    }
    const nextChecked = !isChecked;
    if (checked === undefined) {
      setInnerChecked(nextChecked);
    }
    onCheckedChange?.(nextChecked, value);
  };
  return (
    <Pressable
      {...props}
      disabled={disabled}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: isChecked, disabled }}
      onPress={handlePress}
      style={({ pressed }) => [
        styles.checkboxContainer,
        pressed && styles.pressed,
        disabled && styles.disabled,
        typeof style === "function" ? style({ pressed }) : style,
      ]}
    >
      <View style={[styles.box]}>
        {isChecked && (
          <CommonIcon
            iconType={"check"}
            color={
              disabled
                ? theme.colors[type].disabledComponentBackground
                : theme.colors[type].componentBackgroundColor
            }
            size={20}
          />
        )}
      </View>
      {label && <CommonText size={"s"}>{label}</CommonText>}
    </Pressable>
  );
};

function CheckboxGroup({
  value,
  defaultValue = [],
  onChange,
  multiple = false,
  children,
}: CheckboxGroupProps) {
  const [innerValues, setInnerValues] = useState<string[]>(defaultValue);
  const selectedValues = value ?? innerValues;
  const updateValues = (nextValues: string[]) => {
    if (value === undefined) {
      setInnerValues(nextValues);
    }
    onChange?.(nextValues);
  };
  const toggleValue = (targetValue: string) => {
    const isSelected = selectedValues.includes(targetValue);
    if (multiple) {
      const nextValues = isSelected
        ? selectedValues.filter((v) => v !== targetValue)
        : [...selectedValues, targetValue];
      updateValues(nextValues);
      return;
    }
    const nextValues = isSelected ? [] : [targetValue];
    updateValues(nextValues);
  };

  const contextValue = useMemo(
    () => ({
      selectedValues,
      toggleValue,
    }),
    [selectedValues],
  );

  return (
    <CheckboxGroupContext.Provider value={contextValue}>
      <View style={styles.group}>{children}</View>
    </CheckboxGroupContext.Provider>
  );
}

const Checkbox = Object.assign(CheckboxBase, {
  Group: CheckboxGroup,
});

const styles = StyleSheet.create({
  group: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 6,
  },
  pressed: {
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.4,
  },
  box: {
    width: 24,
    height: 24,
    borderWidth: 1.5,
    borderColor: "#999",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 15,
    color: "#222",
  },
});

export default Checkbox;
