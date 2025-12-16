import { breakpoints } from "./src/breakpoints";
import { appThemes, configureTheme, defaultSettings } from "./src/configure";

configureTheme(
  {
    settings: defaultSettings,
    breakpoints,
    themes: appThemes,
  },
  "override",
);

export * from "react-native-unistyles";
export * from "./src/utils";
export {
  type AppColors,
  dark as darkColors,
  light as lightColors,
} from "./src/colors";
export * from "./src/breakpoints";
export * from "./src/fontSizes";
export * from "./src/borderRadius";
export * from "./src/spacing";
export { fontName } from "./src/fontName";
export { fontsImport } from "./src/fontsImport";
export * from "./src/configure";
export { darkShadows, lightShadows, type AppShadows } from "./src/shadows";
export * from "./src/navigation";
