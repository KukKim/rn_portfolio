import React from "react";
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
  leftComponent?: typeof React.Component;
  leftTitle?: string;
  rightCompnent?: typeof React.Component;
  rightTitle?: string;
  backable?: boolean;
}
