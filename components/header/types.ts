import { ReactNode } from "react";
import { TextStyle, ViewProps, ViewStyle } from "react-native";

type Variant = "primary" | "secondary";
type SizeVariant = "s" | "m" | "l";

export const sizeType: Record<SizeVariant, ViewStyle> = {
  s: { width: 16, height: 16 },
  m: { width: 20, height: 20 },
  l: { width: 24, height: 24 },
};

export const fontSizeType: Record<SizeVariant, TextStyle> = {
  s: { fontSize: 10 },
  m: { fontSize: 12 },
  l: { fontSize: 14 },
};

export interface HeaderProps extends ViewProps {
  type?: Variant;
  size?: SizeVariant;
  leftComponent?: ReactNode;
  leftTitle?: string;
  rightCompnent?: ReactNode;
  rightTitle?: string;
  backable?: boolean;
}
