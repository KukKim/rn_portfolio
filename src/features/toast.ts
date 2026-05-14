import Toast from "react-native-toast-message";
import { ToastMessage } from "../types/toast";

export const showToast = (toast: ToastMessage) => {
  Toast.show({
    type: toast.type,
    text1: toast.title,
    text2: toast.message,
  });
};
