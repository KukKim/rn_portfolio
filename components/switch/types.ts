import { PressableProps } from "react-native";

type Variant = "primary" | "secondary";
type SizeVariant = "s" | "m" | "l";

export const sizeType: Record<SizeVariant, number> = {
  s: 16,
  m: 20,
  l: 24,
};

export interface SwitchProps extends PressableProps {
  type?: Variant;
  size?: SizeVariant;
  value: boolean;
  onChange?: (values: string[]) => void;
}
