import { useTranslation } from "@/src/shared/hooks/translation";
import { NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabLayout() {
  const { t } = useTranslation();

  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>{t("home.title")}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="uiKit">
        <NativeTabs.Trigger.Label>{t("ui.title")}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="puzzlepiece" md="extension" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="features">
        <NativeTabs.Trigger.Label>
          {t("feature.title")}
        </NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="app" md="apps" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="examples">
        <NativeTabs.Trigger.Label>
          {t("example.title")}
        </NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="iphone" md="smartphone" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="settings">
        <NativeTabs.Trigger.Label>
          {t("settings.title")}
        </NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="gear" md="settings" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
