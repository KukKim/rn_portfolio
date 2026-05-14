export interface ToastMessage {
  type: "success" | "error" | "info" | (string & {});
  title?: string;
  message?: string;
}
