import { TextStyle, ViewProps, ViewStyle } from "react-native";

type Variant = "primary" | "secondary";
type SizeVariant = "s" | "m" | "l";

export const sizeType: Record<SizeVariant, ViewStyle> = {
  s: { minWidth: 18, height: 18, borderRadius: 8, padding: 4 },
  m: { minWidth: 20, height: 20, borderRadius: 10, padding: 4 },
  l: { minWidth: 22, height: 22, borderRadius: 12, padding: 4 },
};

export const expandedSizeType: Record<SizeVariant, ViewStyle> = {
  s: { minWidth: 32, height: 16 },
  m: { minWidth: 36, height: 20 },
  l: { minWidth: 40, height: 24 },
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
