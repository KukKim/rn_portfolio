import { useTheme } from "@kukkim/react-native-ui";
import { Stack } from "expo-router";

export default function SettingsLayout() {
  const { theme } = useTheme();
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: theme.colors.background,
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
