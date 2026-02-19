import { ViewProps, ViewStyle } from "react-native";

type Variant = "primary" | "secondary";
type SizeVariant = "s" | "m" | "l";

export const containerType: Record<Variant, ViewStyle> = {
  primary: { backgroundColor: "#2563eb" },
  secondary: { backgroundColor: "#64748b" },
};

export const sizeType: Record<SizeVariant, ViewStyle> = {
  s: { minWidth: 16, height: 16 },
  m: { minWidth: 20, height: 20 },
  l: { minWidth: 24, height: 24 },
};

export interface ProgressBarProps extends ViewProps {
  type?: Variant;
  size?: SizeVariant;
}
