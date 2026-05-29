import { ReactNode } from "react";
import { PressableProps } from "react-native";

type Variant = "primary" | "secondary";
type SizeVariant = "s" | "m" | "l";

export interface CommonListItemProps extends PressableProps {
  type?: Variant;
  size?: SizeVariant;
  title: string;
  children: ReactNode;
}
