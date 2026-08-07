import { ModalProps } from "react-native";

type Variant = "primary" | "secondary";

export interface OverlayProps extends ModalProps {
  type?: Variant;
  children?: React.ReactNode;
}
