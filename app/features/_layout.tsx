import { useTheme } from "@kukkim/react-native-ui";
import { Stack } from "expo-router";

export default function ExamplesLayout() {
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
      <Stack.Screen name="video" options={{ headerShown: false }} />
      <Stack.Screen name="image" options={{ headerShown: false }} />
      <Stack.Screen name="fcm" options={{ headerShown: false }} />
    </Stack>
  );
}
