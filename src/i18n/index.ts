import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";
import en from "./locales/en.json";
import ko from "./locales/ko.json";

export const supportedLanguages = ["ko", "en"] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

export const defaultLanguage: SupportedLanguage = "en";

const translations = {
  ko,
  en,
};

const isSupportedLanguage = (
  value?: string | null,
): value is SupportedLanguage =>
  !!value &&
  (supportedLanguages as readonly string[]).includes(value.toLowerCase());

// Normalizes locale strings such as "ko-KR" / "en-US" to the app's
// supported language codes, falling back to the default language.
export const normalizeLanguage = (
  value?: string | null,
): SupportedLanguage => {
  const languageCode = value?.split("-")[0]?.toLowerCase();
  return isSupportedLanguage(languageCode) ? languageCode : defaultLanguage;
};

export const getDeviceLanguage = (): SupportedLanguage =>
  normalizeLanguage(getLocales()[0]?.languageCode);

export const i18n = new I18n(translations);

i18n.locale = getDeviceLanguage();
i18n.defaultLocale = defaultLanguage;
i18n.enableFallback = true;
