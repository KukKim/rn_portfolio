import { ImageProps, ImageStyle, ViewStyle } from "react-native";

type Variant = "primary" | "secondary";
type SizeVariant = "s" | "m" | "l";

export const containerType: Record<Variant, ViewStyle> = {
  primary: { backgroundColor: "#2563eb" },
  secondary: { backgroundColor: "#64748b" },
};

export const sizeType: Record<SizeVariant, ImageStyle> = {
  s: { width: 24, height: 24, borderRadius: 12, borderWidth: 1 },
  m: { width: 48, height: 48, borderRadius: 24, borderWidth: 1 },
  l: { width: 72, height: 72, borderRadius: 36, borderWidth: 1 },
};

export interface CommonImageProps extends ImageProps {
  type?: Variant;
  size?: SizeVariant;
}
