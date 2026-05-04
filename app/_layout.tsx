import store from "@/src/store";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

// SplashScreen.preventAutoHideAsync();
// Icon check - SFSymbols1_0

export default function RootLayout() {
  return (
    <Provider store={store.store}>
      <PersistGate loading={null} persistor={store.persistor}>
        <Stack>
          <Stack.Screen name="index" />
          <Stack.Screen name="main" options={{ headerShown: false }} />
          <Stack.Screen name="examples" options={{ headerShown: false }} />
          <Stack.Screen name="settings" options={{ headerShown: false }} />
          <Stack.Screen
            name="loginModal"
            options={{
              presentation: "formSheet",
            }}
          />
          <Stack.Screen
            name="signUpModal"
            options={{
              presentation: "formSheet",
            }}
          />
        </Stack>
      </PersistGate>
    </Provider>
  );
}
