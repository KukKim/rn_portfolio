import { FlatListProps, ImageStyle, ViewStyle } from "react-native";

type Variant = "primary" | "secondary";
type SizeVariant = "s" | "m" | "l";

export const containerType: Record<Variant, ViewStyle> = {
  primary: {},
  secondary: {},
};

export const sizeType: Record<SizeVariant, ImageStyle> = {
  s: {},
  m: {},
  l: {},
};

export interface CommonFlatListProps extends FlatListProps {
  type?: Variant;
  size?: SizeVariant;
}
