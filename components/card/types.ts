import { TextStyle, ViewProps, ViewStyle } from "react-native";

type Variant = "primary" | "secondary";

export const titleContainerType: Record<Variant, ViewStyle> = {
  primary: { backgroundColor: "#FFC0CB" },
  secondary: { backgroundColor: "#64748b" },
};

export const contentContainerType: Record<Variant, ViewStyle> = {
  primary: { backgroundColor: "#FFE4E1" },
  secondary: { backgroundColor: "#64748b" },
};

export const titleTextType: Record<Variant, TextStyle> = {
  primary: { color: "#ffffff" },
  secondary: { color: "#ffffff" },
};

export const textType: Record<Variant, TextStyle> = {
  primary: { color: "#ffffff" },
  secondary: { color: "#ffffff" },
};

export interface CardProps extends ViewProps {
  type?: Variant;
  title?: string;
}

export interface ProfileCardProps extends ViewProps {
  type?: Variant;
  name?: string;
  email?: string;
  photoUri?: string;
}
