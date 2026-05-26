import { useAppTheme } from "@/src/hooks/theme";
import store from "@/src/store";
import * as Sentry from "@sentry/react-native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

// SplashScreen.preventAutoHideAsync();
// Icon check - SFSymbols1_0

export default Sentry.wrap(function RootLayout() {
  return (
    <Provider store={store.store}>
      <PersistGate loading={null} persistor={store.persistor}>
        <RouterLayout />
      </PersistGate>
    </Provider>
  );
});

const RouterLayout = () => {
  const { theme } = useAppTheme();
  return (
    <>
      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: theme.colors.backgroundColor,
          },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="main" options={{ headerShown: false }} />
        <Stack.Screen name="examples" options={{ headerShown: false }} />
        <Stack.Screen name="settings" options={{ headerShown: false }} />
        <Stack.Screen
          name="loginModal"
          options={{
            headerShown: false,
            presentation: "formSheet",
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="signUpModal"
          options={{
            headerShown: false,
            presentation: "formSheet",
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="alertModal"
          options={{
            headerShown: false,
            presentation: "transparentModal",
          }}
        />
      </Stack>
      <Toast />
    </>
  );
};
