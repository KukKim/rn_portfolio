export type ThemeMode = "light" | "dark" | "system";

export const lightTheme = {
  mode: "light",
  colors: {
    backgroundColor: "#FFFFFF",
    primary: {
      componentBackgroundColor: "#333CCC",
      disabledComponentBackground: "#cbd5e1",
      textColor: "#333CCC",
    },
    secondary: {
      componentBackgroundColor: "#0088FF",
      disabledComponentBackground: "#cbd5e1",
      textColor: "#0088FF",
    },
  },
};

export const darkTheme = {
  mode: "dark",
  colors: {
    backgroundColor: "#000000",
    primary: {
      componentBackgroundColor: "#FFFFFF",
      disabledComponentBackground: "#FFFFFF",
      textColor: "#FFFFFF",
    },
    secondary: {
      componentBackgroundColor: "#FFFFFF",
      disabledComponentBackground: "#FFFFFF",
      textColor: "#FFFFFF",
    },
  },
};

export type AppTheme = typeof lightTheme;
