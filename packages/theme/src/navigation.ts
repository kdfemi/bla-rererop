import { DefaultTheme, DarkTheme, Theme } from "@react-navigation/native";
import * as colors from "./colors";

export const screenLightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.light.primary,
    border: colors.light.outline,
    card: colors.light.card,
    background: colors.light.background,
    text: colors.light.foreground,
  },
  dark: false,
};

export const screenDarkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.dark.primary,
    border: colors.dark.outline,
    card: colors.dark.card,
    background: colors.dark.background,
    text: colors.dark.foreground,
  },
  dark: true,
};
