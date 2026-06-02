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
      <Stack.Screen name="portfolio" options={{ headerShown: false }} />
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
