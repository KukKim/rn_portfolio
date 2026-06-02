import { ReactNode } from "react";
import { PressableProps, TextStyle, ViewStyle } from "react-native";
import { IconProps } from "../icon/types";

type Variant = "primary" | "secondary";
type SizeVariant = "s" | "m" | "l";

export const sizeType: Record<SizeVariant, ViewStyle> = {
  s: { width: 16, height: 16 },
  m: { width: 20, height: 20 },
  l: { width: 24, height: 24 },
};

export const fontSizeType: Record<SizeVariant, TextStyle> = {
  s: { fontSize: 12 },
  m: { fontSize: 16 },
  l: { fontSize: 20 },
};

export interface ButtonProps extends PressableProps {
  type?: Variant;
  size?: SizeVariant;
}

export interface CommonButtonProps extends ButtonProps {
  title?: string;
}

export interface SocialLoginButtonProps extends ButtonProps {
  provider: "apple" | "facebook" | "google";
}

export interface IconButtonProps extends ButtonProps {
  iconType: IconProps["iconType"];
}

export interface CheckboxProps extends ButtonProps {
  value?: string;
  checked?: boolean;
  label?: string;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean, value?: string) => void;
}

export interface CheckboxGroupProps {
  value?: string[];
  defaultValue?: string[];
  onChange?: (values: string[]) => void;
  multiple?: boolean;
  children: ReactNode;
}

export interface RadioButtonProps extends ButtonProps {
  value: boolean;
}

export interface RadioButtonGroupProps extends ButtonProps {
  value: RadioButtonProps[];
  selectList: string[];
  multiple?: boolean;
}
