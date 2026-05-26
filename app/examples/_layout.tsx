import { useAppTheme } from "@/src/hooks/theme";
import { Stack } from "expo-router";

export default function ExamplesLayout() {
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
      <Stack.Screen name="ui" options={{ headerShown: false }} />
      <Stack.Screen name="navigation" options={{ headerShown: false }} />
      <Stack.Screen name="animation" options={{ headerShown: false }} />
      <Stack.Screen name="video" options={{ headerShown: false }} />
      <Stack.Screen name="image" options={{ headerShown: false }} />
      <Stack.Screen name="fcm" options={{ headerShown: false }} />
    </Stack>
  );
}
