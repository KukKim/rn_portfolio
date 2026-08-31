import { i18n, normalizeLanguage } from "@/src/i18n";
import { useAppSelector } from "@/src/shared/hooks/redux";
import { SocketProvider } from "@/src/shared/hooks/network";
import { selectLanguage } from "@/src/store/settingSelector";
import store from "@/src/store";
import { ThemeProvider, useTheme } from "@kukkim/react-native-ui";
import * as Sentry from "@sentry/react-native";
import {
  QueryClient,
  QueryClientProvider,
  onlineManager,
} from "@tanstack/react-query";
import * as Network from "expo-network";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
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
        <SocketProvider>
          <KeyboardProvider>
            <PersistGate loading={null} persistor={store.persistor}>
              <ThemeProvider>
                <LocaleSync />
              </ThemeProvider>
            </PersistGate>
          </KeyboardProvider>
        </SocketProvider>
      </Provider>
    </QueryClientProvider>
  );
});

// Single place where the Redux language state is synced onto the i18n-js
// singleton, for consumers that read `i18n.locale` outside of React render
// (e.g. non-component modules). Components should prefer `useTranslation()`,
// which already re-renders and translates using the Redux value directly.
const LocaleSync = () => {
  const language = useAppSelector(selectLanguage);

  useEffect(() => {
    i18n.locale = normalizeLanguage(language);
  }, [language]);

  return <RouterLayout />;
};

const RouterLayout = () => {
  const { theme } = useTheme();
  return (
    <GestureHandlerRootView>
      <Stack
        screenOptions={{
          contentStyle: {
            // backgroundColor: theme.colors.background,
          },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="main" options={{ headerShown: false }} />
        <Stack.Screen name="features" options={{ headerShown: false }} />
        <Stack.Screen name="settings" options={{ headerShown: false }} />
        <Stack.Screen name="examples" options={{ headerShown: false }} />
        <Stack.Screen name="ui" options={{ headerShown: false }} />
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
            //TODO: 위의 theme backgroundColor 때문에 transparent가 적용안됨.
            presentation: "transparentModal",
          }}
        />
        <Stack.Screen
          name="keyboardModal"
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
