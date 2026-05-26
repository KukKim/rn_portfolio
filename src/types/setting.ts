import { lightTheme } from "@/src/styles/theme";

export interface Setting {
  notificationEnabled: boolean;
  themeMode: ThemeMode;
}

export type ThemeMode = "light" | "dark" | "system";
export type AppTheme = typeof lightTheme;
