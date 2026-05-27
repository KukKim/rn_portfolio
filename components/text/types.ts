import { TextProps, TextStyle } from "react-native";

type Variant = "primary" | "secondary";
type SizeVariant = "s" | "m" | "l";

export const fontSizeType: Record<SizeVariant, TextStyle> = {
  s: { fontSize: 12, fontWeight: "600" },
  m: { fontSize: 24, fontWeight: "700" },
  l: { fontSize: 36, fontWeight: "900" },
};

export interface CommonTextProps extends TextProps {
  type?: Variant;
  size?: SizeVariant;
}
