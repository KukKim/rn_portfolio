import { ViewProps } from "react-native";

type Variant = "primary" | "secondary";
type SizeVariant = "s" | "m" | "l";

// export const sizeType: Record<SizeVariant, ViewStyle> = {
//   s: { width: 16, height: 16 },
//   m: { width: 20, height: 20 },
//   l: { width: 24, height: 24 },
// };

export interface IconProps extends ViewProps {
  iconType:
    | "setting"
    | "search"
    | "spinner"
    | "check"
    | "back"
    | "apple"
    | "facebook"
    | "google"
    | "close"
    | "tune"
    | "star_empty"
    | "star_half"
    | "star_full";
  type?: Variant;
  // size?: SizeVariant;
  size?: number;
  color?: string;
}
