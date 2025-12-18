import React, { forwardRef } from "react";
import {
  TouchableOpacityProps,
  TouchableOpacity as RNTouchableOpacity,
  View,
} from "react-native";
import { StyleSheet } from "@example/theme";

type props = {
  children?: React.ReactNode;
};

export const TouchableOpacity = forwardRef<View, props & TouchableOpacityProps>(
  ({ children, activeOpacity, ...props }, ref) => {
    return (
      <RNTouchableOpacity
        {...props}
        ref={ref}
        activeOpacity={activeOpacity ?? 0.6}
      >
        {children}
      </RNTouchableOpacity>
    );
  },
);

TouchableOpacity.displayName = "TouchableOpacity";

// to force theme to update when the theme changes
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = StyleSheet.create({
  // this dummy style is needed to not break unistyles
  // _forceThemeUpdate: {},
});
