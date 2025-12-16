import React, { forwardRef } from "react";
import {
  TextProps as RNTextProps,
  Text as RNText,
  TextStyle,
} from "react-native";
import {
  StyleSheet,
  withUnistyles,
  UnistylesTheme,
  maxFontSizeMultiplier,
  lightColors,
} from "@example/theme";

export type ArgumentTypeWithString<T> = T | (string & {});

export type TextColors = ArgumentTypeWithString<keyof typeof lightColors>;
type props = {
  color?: TextColors;
  fontSize?: number;
  lineHeight?: number;
  textAlign?: TextStyle["textAlign"];
  textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
};

const CustomText = forwardRef<RNText, props & RNTextProps>(
  (
    {
      fontSize,
      textAlign,
      children,
      suppressHighlighting = true,
      textTransform,
      lineHeight,
      color,
      ...props
    },
    ref,
  ) => {
    return (
      <RNText
        maxFontSizeMultiplier={maxFontSizeMultiplier}
        {...props}
        suppressHighlighting={suppressHighlighting}
        style={[styles.text(color), props.style]}
        ref={ref}
      >
        {children}
      </RNText>
    );
  },
);

CustomText.displayName = "CustomText";

const UniText = withUnistyles(CustomText);

export const Text = forwardRef<RNText, props & RNTextProps>((props, ref) => {
  const { color, ...rest } = props;
  const getColor = (theme: UnistylesTheme) => {
    if (color) {
      const preset = theme.colors[color as keyof typeof theme.colors];
      return preset ? preset : color;
    }
    return theme.colors.foreground;
  };
  return (
    <UniText
      {...rest}
      uniProps={(theme) => ({
        color: getColor(theme),
      })}
      ref={ref}
    />
  );
});

Text.displayName = "Text";

const styles = StyleSheet.create((theme) => ({
  text: (color?: TextColors) => {
    return {
      includeFontPadding: false,
      color: color,
    };
  },
}));

export type TextProps = props & RNTextProps;

export const BasicText = RNText;
