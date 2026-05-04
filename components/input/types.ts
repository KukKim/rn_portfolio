import { TextInputProps, TextStyle, ViewStyle } from "react-native";

type Variant = "primary" | "secondary";
type SizeVariant = "s" | "m" | "l";

export const containerType: Record<Variant, ViewStyle> = {
  primary: { borderColor: "#333CCC" },
  secondary: { borderColor: "0088FF" },
};
export const warningContainerType: Record<Variant, ViewStyle> = {
  primary: { borderColor: "#EE0000" },
  secondary: { borderColor: "#64748b" },
};

export const fontSizeType: Record<SizeVariant, TextStyle> = {
  s: { fontSize: 10 },
  m: { fontSize: 12 },
  l: { fontSize: 14 },
};

export interface InputProps extends TextInputProps {
  title?: string;
  type?: Variant;
  size?: SizeVariant;
  textStyle?: TextStyle;
  containerStyle?: ViewStyle;
  warningText?: string;
}
