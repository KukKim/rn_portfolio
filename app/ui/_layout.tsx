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
      <Stack.Screen name="button" options={{ headerShown: false }} />
      <Stack.Screen name="input" options={{ headerShown: false }} />
      <Stack.Screen name="badge" options={{ headerShown: false }} />
      <Stack.Screen name="card" options={{ headerShown: false }} />
      <Stack.Screen name="progressBar" options={{ headerShown: false }} />
      <Stack.Screen name="checkbox" options={{ headerShown: false }} />
      <Stack.Screen name="spinner" options={{ headerShown: false }} />
      <Stack.Screen name="switch" options={{ headerShown: false }} />
      <Stack.Screen name="rating" options={{ headerShown: false }} />
      <Stack.Screen name="select" options={{ headerShown: false }} />
      <Stack.Screen name="slider" options={{ headerShown: false }} />
    </Stack>
  );
}
