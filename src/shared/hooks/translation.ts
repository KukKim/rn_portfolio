import { i18n, normalizeLanguage, SupportedLanguage } from "@/src/i18n";
import { setLanguage } from "@/src/store/settingSlice";
import { selectLanguage } from "@/src/store/settingSelector";
import type { Scope, TranslateOptions } from "i18n-js";
import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "./redux";

// Subscribes to the Redux language state so any component using this hook
// re-renders immediately when the language changes, and always translates
// with the current Redux value (via i18n-js's per-call `locale` option)
// instead of relying on the mutable `i18n.locale` singleton.
export const useTranslation = () => {
  const locale = useAppSelector(selectLanguage);
  const dispatch = useAppDispatch();

  const t = useCallback(
    <T = string>(scope: Scope, options?: TranslateOptions) =>
      i18n.t<T>(scope, { locale, ...options }),
    [locale],
  );

  const changeLanguage = useCallback(
    (value: string) => {
      dispatch(setLanguage(normalizeLanguage(value)));
    },
    [dispatch],
  );

  return useMemo(
    () => ({ t, locale: locale as SupportedLanguage, changeLanguage }),
    [t, locale, changeLanguage],
  );
};
