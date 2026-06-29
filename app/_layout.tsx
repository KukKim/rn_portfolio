import { useAppTheme } from "@/src/hooks/theme";
import store from "@/src/store";
import { ThemeProvider } from "@kukkim/react-native-ui";
import * as Sentry from "@sentry/react-native";
import {
  QueryClient,
  QueryClientProvider,
  onlineManager,
} from "@tanstack/react-query";
import * as Network from "expo-network";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5분
      gcTime: 1000 * 60 * 5,
    },
  },
});

onlineManager.setEventListener((setOnline) => {
  let initialised = false;

  const eventSubscription = Network.addNetworkStateListener((state) => {
    initialised = true;
    setOnline(!!state.isConnected);
  });

  Network.getNetworkStateAsync()
    .then((state) => {
      if (!initialised) {
        setOnline(!!state.isConnected);
      }
    })
    .catch(() => {
      // getNetworkStateAsync can reject on some platforms/SDK versions
    });

  return eventSubscription.remove;
});

// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

// SplashScreen.preventAutoHideAsync();
// Icon check - SFSymbols1_0

export default Sentry.wrap(function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store.store}>
        <PersistGate loading={null} persistor={store.persistor}>
          <ThemeProvider>
            <RouterLayout />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
});

const RouterLayout = () => {
  const { theme } = useAppTheme();
  return (
    <GestureHandlerRootView>
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
    </GestureHandlerRootView>
  );
};
