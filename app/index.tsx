import { getLocales } from "expo-localization";
import { Redirect } from "expo-router";
import { I18n } from "i18n-js";
import translation from "./translation.json";

export default function Index() {
  const i18n = new I18n(translation);
  i18n.locale = getLocales().at(0)?.languageCode ?? "en";
  return <Redirect href="/main" />;
}
