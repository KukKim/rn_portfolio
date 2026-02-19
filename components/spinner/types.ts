import { ViewProps, ViewStyle } from "react-native";

type Variant = "primary" | "secondary";
type SizeVariant = "s" | "m" | "l";

export const containerType: Record<Variant, ViewStyle> = {
  primary: { borderColor: "#2563eb" },
  secondary: { borderColor: "#64748b" },
};

export interface SpinnerProps extends ViewProps {
  type?: Variant;
  size?: SizeVariant;
}
