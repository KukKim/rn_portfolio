import { ImageProps, ImageStyle, ViewStyle } from "react-native";

type Variant = "primary" | "secondary";
type SizeVariant = "s" | "m" | "l";

export const containerType: Record<Variant, ViewStyle> = {
  primary: { backgroundColor: "#2563eb" },
  secondary: { backgroundColor: "#64748b" },
};

export const sizeType: Record<SizeVariant, ImageStyle> = {
  s: { width: 128, height: 128 },
  m: { width: 256, height: 256 },
  l: { width: 384, height: 384 },
};

export interface CommonImageProps extends ImageProps {
  type?: Variant;
  size?: SizeVariant;
}
