import { Modal, Pressable } from "react-native";
import { OverlayProps } from "./types";

const CommonOverlay = ({
  children,
  type = "primary",
  visible = false,
  onRequestClose,
  ...props
}: OverlayProps) => {
  return (
    <Modal transparent={true} visible={visible}>
      <Pressable
        className="flex-1 justify-center items-center bg-black/50"
        onPress={onRequestClose}
      >
        {children}
      </Pressable>
    </Modal>
  );
};

export default CommonOverlay;
