import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import { useColorScheme } from "react-native";
import { AppTheme, darkTheme, lightTheme, ThemeMode } from "./theme";

type ThemeContextValue = {
  theme: AppTheme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  isDark: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

// TODO : 현재 storage에 state가 저장되지 않고 있음. context가 storage에 저장되도록 구현하거나 redux 로 옮기도록 수정필요.
export function AppThemeProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>("system");

  const isDark =
    mode === "system" ? systemColorScheme === "dark" : mode === "dark";

  const theme = useMemo(() => {
    return isDark ? darkTheme : lightTheme;
  }, [isDark]);

  const value = useMemo(
    () => ({
      theme,
      mode,
      setMode,
      isDark,
    }),
    [theme, mode, isDark],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useAppTheme must be used within AppThemeProvider");
  }

  return context;
}
