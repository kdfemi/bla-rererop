import {
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";
import React, { forwardRef, ReactNode } from "react";
import { StyleSheet, useUnistyles } from "@example/theme";
import { Touchable } from "./touchable";
import type { UnistylesTheme, UnistylesVariants } from "@example/theme";
import { Text } from "./text";
import { LoadingIndicator } from "./loadingIndicator";

type SideItem = Omit<React.ReactNode, string | number>;

type RenderFunction = (props: { textStyles: TextStyle }) => React.ReactNode;

type Props = UnistylesVariants<typeof styles> & {
  children?: React.ReactNode | RenderFunction;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  itemLeft?: SideItem;
  itemRight?: SideItem;
  loading?: boolean;
  withArrow?: boolean;
  alignHorizontal?: "left" | "center" | "right";
} & Omit<TouchableOpacityProps, "children">;

export const Button = forwardRef<View, Props>(
  (
    {
      color = "primary",
      fill = "solid",
      size = "md",
      expanded = true,
      children,
      itemLeft,
      itemRight,
      loading,
      style,
      textStyle,
      disabled,
      withArrow,
      alignHorizontal = "center",
      ...props
    },
    ref,
  ) => {
    styles.useVariants({
      color,
      size,
      fill,
      expanded,
      disabled: disabled || loading,
      alignHorizontal,
    });
    const { theme } = useUnistyles();
    // Needed because button is not automatically re-rendered when the theme changes
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const isDark = theme.dark;

    const renderChildren = () => {
      if (typeof children === "string") {
        return <Text style={[styles.text, textStyle]}>{children}</Text>;
      } else if (typeof children === "function") {
        return children({ textStyles: styles.text });
      }
      return children;
    };

    const renderSideItems = (sideItem?: SideItem) => {
      return sideItem as ReactNode;
    };

    const renderButtonContent = () => {
      if (loading) {
        return (
          <LoadingIndicator variant={fill === "solid" ? "accent" : "primary"} />
        );
      }
      return (
        <View style={styles.buttonContent}>
          {renderSideItems(itemLeft)}
          {renderChildren()}
          {renderSideItems(itemRight)}
        </View>
      );
    };

    return (
      <Touchable
        {...props}
        activeOpacity={0.8}
        disabled={disabled || loading}
        accessibilityRole="button"
        ref={ref}
        style={[styles.button, style]}
      >
        {renderButtonContent()}
        {withArrow && (
          <View style={styles.arrow}>{renderSideItems("chevron-right")}</View>
        )}
      </Touchable>
    );
  },
);

export type ButtonProps = Props;

Button.displayName = "Button";

const styles = StyleSheet.create((theme, rt) => {
  const defaultButtonSize = (theme: UnistylesTheme) => ({
    height: 48,
    paddingVertical: 14,
    paddingHorizontal: theme.spacing.xs,
  });

  const defaultButtonTextSize = (theme: UnistylesTheme) => ({
    fontSize: theme.fontSizes.sm,
  });

  const defaultIconButtonSize = (theme: UnistylesTheme) => ({
    height: 48,
    width: 48,
    maxWidth: 48,
    maxHeight: 48,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: theme.borderRadius.lg,
  });

  const smallButtonSize = (theme: UnistylesTheme) => ({
    height: 24,
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: theme.borderRadius.sm,
  });

  const smallButtonTextSize = (theme: UnistylesTheme) => ({
    fontSize: 10,
  });

  return {
    button: {
      borderColor: theme.colors.transparent,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: theme.borderRadius.xl,
      borderWidth: 1,
      variants: {
        color: {
          primary: {
            backgroundColor: theme.colors.primary,
          },
          secondary: {
            backgroundColor: theme.colors.gray500,
          },
          danger: {
            backgroundColor: theme.colors.red600,
          },
          success: {
            backgroundColor: theme.colors.success600,
          },
          tertiary: {},
        },
        size: {
          icon: defaultIconButtonSize(theme),
          sm: smallButtonSize(theme),
          md: defaultButtonSize(theme),
          default: defaultButtonSize(theme),
        },
        fill: {
          outline: {
            backgroundColor: theme.colors.transparent,
          },
          clear: {
            backgroundColor: theme.colors.transparent,
          },
          solid: {},
        },
        expanded: {
          true: {
            width: "100%",
          },
          false: {
            width: "auto",
          },
          default: {
            width: "100%",
          },
        },
        disabled: {
          true: {
            opacity: 0.6,
          },
          false: {},
        },
        alignHorizontal: {
          left: {
            alignItems: "flex-start",
          },
          center: {
            alignItems: "center",
          },
          right: {
            alignItems: "flex-end",
          },
        },
      },
      compoundVariants: [
        {
          fill: "outline",
          color: "primary",
          styles: {
            borderColor: theme.colors.primary,
          },
        },
        {
          fill: "outline",
          color: "secondary",
          styles: {
            borderColor: theme.colors.gray500,
          },
        },
        {
          fill: "outline",
          color: "danger",
          styles: {
            borderColor: theme.colors.red600,
          },
        },
        {
          fill: "outline",
          color: "success",
          styles: {
            borderColor: theme.colors.success600,
          },
        },
        {
          color: "tertiary",
          fill: "outline",
          styles: {
            borderColor: theme.dark
              ? theme.colors.primary800
              : theme.colors.gray200,
          },
        },
      ],
    },
    buttonContent: {
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      columnGap: theme.spacing.sm,
    },
    text: {
      variants: {
        color: {},
        size: {
          md: defaultButtonTextSize(theme),
          sm: smallButtonTextSize(theme),
          default: defaultButtonTextSize(theme),
        },
        fill: {},
        expanded: {},
        disabled: {
          true: {
            opacity: 0.8,
          },
          false: {},
        },
      },
      compoundVariants: [
        {
          color: "primary",
          fill: "solid",
          styles: {
            color: theme.colors.primaryAccent,
          },
        },
        {
          color: "primary",
          fill: "outline",
          styles: {
            color: theme.colors.primary,
          },
        },
        {
          color: "primary",
          fill: "clear",
          styles: {
            color: theme.colors.secondary,
          },
        },
        {
          color: "secondary",
          fill: "outline",
          styles: {
            color: theme.colors.gray500,
          },
        },
        {
          color: "secondary",
          fill: "solid",
          styles: {
            color: theme.colors.gray300,
          },
        },
        {
          color: "secondary",
          fill: "clear",
          styles: {
            color: theme.dark
              ? theme.colors.gray500
              : theme.colors.primaryYellow800,
          },
        },
        {
          color: "success",
          fill: "outline",
          styles: {
            color: theme.colors.success600,
          },
        },
        {
          color: "success",
          fill: "solid",
          styles: {
            color: theme.colors.white,
          },
        },
        {
          color: "success",
          fill: "clear",
          styles: {
            color: theme.colors.success600,
          },
        },
        {
          color: "danger",
          fill: "outline",
          styles: {
            color: theme.colors.red600,
          },
        },
        {
          color: "danger",
          fill: "solid",
          styles: {
            color: theme.colors.white,
          },
        },
        {
          color: "danger",
          fill: "clear",
          styles: {
            color: theme.colors.red600,
          },
        },
        {
          color: "tertiary",
          fill: "clear",
          styles: {
            color: theme.dark ? theme.colors.gray400 : theme.colors.gray300,
          },
        },
        {
          color: "tertiary",
          fill: "outline",
          styles: {
            color: theme.dark ? theme.colors.primary : theme.colors.primary700,
          },
        },
      ],
    },
    arrow: {
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      justifyContent: "center",
      alignItems: "flex-end",
      paddingHorizontal: theme.spacing.lg,
    },
  };
});
