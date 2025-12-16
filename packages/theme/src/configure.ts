import {
  StyleSheet,
  UnistylesBreakpoints,
  UnistylesRuntime,
  UnistylesThemes,
} from "react-native-unistyles";
import * as colors from "./colors";
import { fontSizes } from "./fontSizes";
import { borderRadius } from "./borderRadius";
import { spacing } from "./spacing";
import { breakpoints } from "./breakpoints";
import { darkShadows, lightShadows } from "./shadows";
import { MMKV } from "react-native-mmkv";
import { DeviceEventEmitter } from "react-native";
import * as navigation from "./navigation";

const storageKey = "preferredTheme";

const storeStorage = new MMKV({
  id: "theme-storage",
});

export const getThemeFromStorage = () => {
  const theme = storeStorage.getString(storageKey);
  if (theme) {
    return theme as AppThemeName;
  }
  return "dark";
};

export const setThemeToStorage = (theme: AppThemeName) => {
  storeStorage.set(storageKey, theme);
};

export const defaultSettings: UnistylesConfig["settings"] = {
  // initialTheme: "light",
  adaptiveThemes: false,
  nativeBreakpointsMode: "pixels",
  initialTheme: () => {
    // get preferred theme from user's preferences/MMKV/SQL/StanJS etc.
    return getThemeFromStorage();
  },
};

export const lightTheme = {
  colors: colors.light,
  fontSizes,
  borderRadius,
  spacing,
  shadows: lightShadows,
  dark: false,
  navigation: navigation.screenLightTheme,
};

export const darkTheme: typeof lightTheme = {
  colors: colors.dark,
  fontSizes,
  borderRadius,
  spacing,
  shadows: darkShadows,
  dark: true,
  navigation: navigation.screenDarkTheme,
};

export const appThemes = {
  light: lightTheme,
  dark: darkTheme,
};

export const updateTheme = (name: AppThemeName, theme: Partial<AppTheme>) => {
  UnistylesRuntime.updateTheme(
    name,
    (oldTheme) =>
      ({
        ...oldTheme,
        ...theme,
        borderRadius: {
          ...oldTheme.borderRadius,
          ...theme.borderRadius,
        },
        colors: {
          ...oldTheme.colors,
          ...theme.colors,
        },
        fontSizes: {
          ...oldTheme.fontSizes,
          ...theme.fontSizes,
        },
        spacing: {
          ...oldTheme.spacing,
          ...theme.spacing,
        },
      }) satisfies typeof lightTheme,
  );
};

export const toggleTheme = () => {
  const currentTheme = UnistylesRuntime.getTheme();
  const newThemeName = currentTheme.dark ? "light" : "dark";
  changeTheme(newThemeName);
};

export const changeTheme = (name: AppThemeName) => {
  const newActiveTheme = UnistylesRuntime.getTheme(name);
  UnistylesRuntime.setTheme(name);
  DeviceEventEmitter.emit("themeChanged", {
    theme: name,
  });
  setThemeToStorage(name);
  try {
    UnistylesRuntime.setRootViewBackgroundColor(
      newActiveTheme.colors.background,
    );
  } catch {
    // catch RangeError: Maximum call stack size exceeded, js engine: hermes
  }
};

export const configureTheme = (
  config: UnistylesConfig,
  type: "override" | "merge" = "merge",
) => {
  if (type === "override") {
    StyleSheet.configure(config);
    return;
  }
  StyleSheet.configure({
    settings: Object.assign(defaultSettings || {}, config.settings),
    breakpoints: Object.assign(breakpoints, config.breakpoints),
    themes: Object.assign(appThemes, config.themes),
  });
};

export const hasThemeSet = () => {
  return !!storeStorage.getString(storageKey);
};

type UnistylesThemeSettings =
  | {
      initialTheme: (() => keyof UnistylesThemes) | keyof UnistylesThemes;
    }
  | {
      adaptiveThemes: boolean;
    };

type UnistylesSettings = UnistylesThemeSettings & {
  CSSVars?: boolean;
  nativeBreakpointsMode?: "pixels" | "points";
};

export type UnistylesConfig = {
  settings?: UnistylesSettings;
  themes?: UnistylesThemes;
  breakpoints?: UnistylesBreakpoints;
};

export type AppBreakpoints = typeof breakpoints;
export type AppThemes = typeof appThemes;
export type UnistylesTheme = UnistylesThemes[keyof UnistylesThemes];
export type AppTheme = UnistylesThemes[AppThemeName];

export type AppThemeName = keyof AppThemes;

declare module "react-native-unistyles" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface UnistylesThemes extends AppThemes {}
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}
