import { addErrorLog } from "@/src/features/logging";
import { registerForPushNotificationsAsync } from "@/src/features/notification";
import store from "@/src/store";
import * as Sentry from "@sentry/react-native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
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
  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => {
        // console.log(token ?? "")
      })
      .catch((error: any) => {
        addErrorLog(error);
      });
  }, []);
  return (
    <Provider store={store.store}>
      <PersistGate loading={null} persistor={store.persistor}>
        <Stack>
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
            }}
          />
        </Stack>
      </PersistGate>
    </Provider>
  );
});
