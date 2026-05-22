import { TextProps, TextStyle } from "react-native";

type Variant = "primary" | "secondary";
type SizeVariant = "s" | "m" | "l";

export const fontSizeType: Record<SizeVariant, TextStyle> = {
  s: { fontSize: 12 },
  m: { fontSize: 16 },
  l: { fontSize: 20 },
};

export interface CommonTextProps extends TextProps {
  type?: Variant;
  size?: SizeVariant;
}
