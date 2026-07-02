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
      <Stack.Screen name="portfolio" options={{ headerShown: false }} />
      <Stack.Screen name="games" options={{ headerShown: false }} />
      <Stack.Screen
        name="listControlModal"
        options={{
          headerShown: false,
          presentation: "formSheet",
          sheetAllowedDetents: [0.5],
        }}
      />
    </Stack>
  );
}
