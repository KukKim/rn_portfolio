import { NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf="house.fill"
          md="home"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="uiKit">
        <NativeTabs.Trigger.Label>UI Kit</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf="puzzlepiece"
          md="extension"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="features">
        <NativeTabs.Trigger.Label>Features</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf="app"
          md="apps"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="examples">
        <NativeTabs.Trigger.Label>Examples</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf="iphone"
          md="smartphone"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="settings">
        <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf="gear"
          md="settings"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}