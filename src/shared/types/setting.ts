import { SupportedLanguage } from "@/src/i18n";

export interface Setting {
  notificationEnabled: boolean;
  themeMode: "light" | "dark";
  language: SupportedLanguage;
}
