import { useAppDispatch, useAppSelector } from "@/src/hooks/redux";
import { updateThemeMode } from "@/src/store/settingSlice";
import { darkTheme, lightTheme } from "@/src/styles/theme";
import { useColorScheme } from "react-native";
import { ThemeMode } from "../types/setting";

export function useAppTheme() {
  const systemColorScheme = useColorScheme();
  const dispatch = useAppDispatch();
  const updateTheme = (mode: ThemeMode) => {
    dispatch(updateThemeMode(mode));
  };
  const mode = useAppSelector((state) => state.setting.themeMode);
  const isDark =
    mode === "system" ? systemColorScheme === "dark" : mode === "dark";
  const theme = isDark ? darkTheme : lightTheme;

  return {
    theme,
    mode,
    isDark,
    updateTheme,
  };
}
