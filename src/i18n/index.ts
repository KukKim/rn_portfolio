import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";

import en from "./locales/en.json";
import ko from "./locales/ko.json";

export const supportedLanguages = ["ko", "en"] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

const translations = {
  ko,
  en,
};

const deviceLanguage = getLocales()[0]?.languageCode;
const initialLanguage: SupportedLanguage = supportedLanguages.includes(
  deviceLanguage as SupportedLanguage,
)
  ? (deviceLanguage as SupportedLanguage)
  : "en";

export const i18n = new I18n(translations);

i18n.locale = initialLanguage;
i18n.defaultLocale = "en";
i18n.enableFallback = true;
