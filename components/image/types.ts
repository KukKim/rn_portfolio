import { ImageProps, ImageStyle } from "react-native";

type Variant = "primary" | "secondary";
type SizeVariant = "s" | "m" | "l";

export const sizeType: Record<SizeVariant, ImageStyle> = {
  s: { width: 24, height: 24 },
  m: { width: 48, height: 48 },
  l: { width: 72, height: 72 },
};

export const avatarSizeType: Record<SizeVariant, ImageStyle> = {
  s: { width: 24, height: 24, borderRadius: 12, borderWidth: 1 },
  m: { width: 48, height: 48, borderRadius: 24, borderWidth: 1 },
  l: { width: 72, height: 72, borderRadius: 36, borderWidth: 1 },
};

export interface CommonImageProps extends ImageProps {
  type?: Variant;
  size?: SizeVariant;
}
