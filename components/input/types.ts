import { TextInputProps, TextStyle, ViewStyle } from "react-native";

type Variant = "primary" | "secondary";
type SizeVariant = "s" | "m" | "l";

export const containerType: Record<Variant, ViewStyle> = {
  primary: { borderColor: "#2563eb" },
  secondary: { borderColor: "#64748b" },
};

export const fontSizeType: Record<SizeVariant, TextStyle> = {
  s: { fontSize: 10 },
  m: { fontSize: 12 },
  l: { fontSize: 14 },
};

export interface InputProps extends TextInputProps {
  type?: Variant;
  size?: SizeVariant;
  textStyle?: TextStyle;
  containerStyle?: ViewStyle;
}
