import { TextStyle, ViewProps, ViewStyle } from "react-native";

type Variant = "primary" | "secondary";
type SizeVariant = "s" | "m" | "l";

export const sizeType: Record<SizeVariant, ViewStyle> = {
  s: { width: 16, height: 16, borderRadius: 8 },
  m: { width: 20, height: 20, borderRadius: 10 },
  l: { width: 24, height: 24, borderRadius: 12 },
};

export const expandedSizeType: Record<SizeVariant, ViewStyle> = {
  s: { width: 32, height: 16 },
  m: { width: 36, height: 20 },
  l: { width: 40, height: 24 },
};

export const fontSizeType: Record<SizeVariant, TextStyle> = {
  s: { fontSize: 10 },
  m: { fontSize: 12 },
  l: { fontSize: 14 },
};

export interface BadgeProps extends ViewProps {
  type?: Variant;
  size?: SizeVariant;
}

export interface CommonBadgeProps extends BadgeProps {
  typeText?: string;
}

export interface NumberBadgeProps extends BadgeProps {
  number: number;
  maxNumber?: number;
}
