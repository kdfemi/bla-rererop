import { BoxShadowValue } from "react-native";

export const lightShadows = {
  main: {
    blurRadius: 32,
    offsetX: 0,
    offsetY: 4,
    color: "#10142E14",
    spreadDistance: -8,
  },
  small: {
    blurRadius: 16,
    offsetX: 0,
    offsetY: -2,
    color: "#1D212514",
    spreadDistance: 0,
  }
} satisfies Record<string, BoxShadowValue>;

export const darkShadows: typeof lightShadows = {
  ...lightShadows,
};

export type AppShadows = Record<keyof typeof lightShadows, BoxShadowValue>;
