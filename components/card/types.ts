import { ViewProps } from "react-native";

type Variant = "primary" | "secondary";

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
