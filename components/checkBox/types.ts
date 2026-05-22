import { TextStyle, ViewProps, ViewStyle } from "react-native";

type Variant = "primary" | "secondary";
type SizeVariant = "s" | "m" | "l";

export const sizeType: Record<SizeVariant, ViewStyle> = {
  s: { width: 16, height: 16 },
  m: { width: 20, height: 20 },
  l: { width: 24, height: 24 },
};

export const iconSizeType: Record<SizeVariant, number> = {
  s: 12,
  m: 16,
  l: 20,
};

export const fontSizeType: Record<SizeVariant, TextStyle> = {
  s: { fontSize: 10 },
  m: { fontSize: 12 },
  l: { fontSize: 14 },
};

export const checkType: Record<Variant, string> = {
  primary: "#2563eb",
  secondary: "#64748b",
};

export interface CheckBoxProps extends ViewProps {
  value: boolean;
  onValueChange: Function;
  type?: Variant;
  size?: SizeVariant;
}
