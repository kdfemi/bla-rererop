declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}

declare var process: {
  env: {
    EXPO_PUBLIC_API_URL: string;
    NODE_ENV: "development" | "production";
  } & Record<string, string>;
};
