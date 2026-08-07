import { useTheme } from "@kukkim/react-native-ui";
import { Modal, Pressable, StyleSheet } from "react-native";
import { OverlayProps } from "./types";

const CommonOverlay = ({
  children,
  type = "primary",
  visible = false,
  onRequestClose,
  ...props
}: OverlayProps) => {
  const { theme } = useTheme();
  return (
    <Modal transparent={true} visible={visible}>
      <Pressable
        style={[styles.overlayBackground, { borderColor: theme.colors.border }]}
        onPress={onRequestClose}
      >
        {children}
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlayBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default CommonOverlay;
