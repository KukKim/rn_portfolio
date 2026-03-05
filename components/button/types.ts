import { TextStyle, TouchableOpacityProps, ViewStyle } from "react-native";

type Variant = "primary" | "secondary";
type SizeVariant = "s" | "m" | "l";

export const containerType: Record<Variant, ViewStyle> = {
  primary: { backgroundColor: "#2563eb" },
  secondary: { backgroundColor: "#64748b" },
};

export const textType: Record<Variant, TextStyle> = {
  primary: { color: "#000000" },
  secondary: { color: "#000000" },
};

export const sizeType: Record<SizeVariant, ViewStyle> = {
  s: { width: 16, height: 16 },
  m: { width: 20, height: 20 },
  l: { width: 24, height: 24 },
};

export const fontSizeType: Record<SizeVariant, TextStyle> = {
  s: { fontSize: 12 },
  m: { fontSize: 16 },
  l: { fontSize: 20 },
};

export interface ButtonProps extends TouchableOpacityProps {
  type?: Variant;
  size?: SizeVariant;
}

export interface CommonButtonProps extends ButtonProps {
  title?: string;
}
