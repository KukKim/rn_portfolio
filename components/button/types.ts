import { TextStyle, TouchableOpacityProps, ViewStyle } from "react-native";

type Variant = "primary" | "secondary";
type SizeVariant = "s" | "m" | "l";

export const containerType: Record<Variant, ViewStyle> = {
  primary: { backgroundColor: "#333CCC" },
  secondary: { backgroundColor: "#0088FF" },
};

export const disabledContainerType: Record<Variant, ViewStyle> = {
  primary: { backgroundColor: "#cbd5e1" },
  secondary: { backgroundColor: "#cbd5e1" },
};

export const textType: Record<Variant, TextStyle> = {
  primary: { color: "#FFFFFF" },
  secondary: { color: "#FFFFFF" },
};

export const disabledTextType: Record<Variant, TextStyle> = {
  primary: { color: "#94a3b8" },
  secondary: { color: "#94a3b8" },
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

export interface SocialLoginButtonProps extends ButtonProps {
  provider: "apple" | "facebook" | "google";
}
