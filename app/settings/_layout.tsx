import { useAppTheme } from "@/src/styles/ThemeProvider";
import { Stack } from "expo-router";

export default function SettingsLayout() {
  const { theme } = useAppTheme();
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: theme.colors.backgroundColor,
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="language" options={{ headerShown: false }} />
      <Stack.Screen name="notification" options={{ headerShown: false }} />
      <Stack.Screen name="updateUserInfo" options={{ headerShown: false }} />
      <Stack.Screen name="theme" options={{ headerShown: false }} />
    </Stack>
  );
}
