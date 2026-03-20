import { Stack } from "expo-router";

export default function ExamplesLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="navigation" options={{ headerShown: false }} />
      <Stack.Screen name="animation" options={{ headerShown: false }} />
      <Stack.Screen name="video" options={{ headerShown: false }} />
      <Stack.Screen name="image" options={{ headerShown: false }} />
    </Stack>
  );
}
