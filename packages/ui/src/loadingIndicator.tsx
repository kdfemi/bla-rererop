import { View } from "react-native";
import React, { FC, useEffect } from "react";
import { StyleSheet, withUnistyles, type AppColors } from "@example/theme";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

type Props = {
  size?: number;
  color?: string;
  colors?: Array<string>;
  variant?: "mixed" | "accent" | "primary";
  shape?: "circle" | "horizontal";
};

type InternalProps = Props & {
  themeColors: AppColors;
};

const InternalLoadingIndicator: FC<InternalProps> = ({
  color,
  colors = [],
  themeColors,
  variant = "primary",
  size = 32,
  shape = "horizontal",
}) => {
  const dots = Array.from({ length: 3 }, (_, index) => ({}));
  let defaultColors: Array<string> = [];
  if (variant === "mixed") {
    defaultColors = [
      themeColors.primary,
      themeColors.primaryAccent,
      themeColors.primary,
    ];
  }
  if (variant === "accent") {
    defaultColors = [
      themeColors.primaryAccent,
      themeColors.primaryAccent,
      themeColors.primaryAccent,
    ];
  }
  if (variant === "primary") {
    defaultColors = [
      themeColors.primary,
      themeColors.primary,
      themeColors.primary,
    ];
  }
  if (colors && colors.length > 0) {
    defaultColors = colors;
  }

  const renderDot = () => {
    return dots.map((_, index) => (
      <Dot
        key={index}
        color={defaultColors[index] || color}
        size={size}
        index={index}
      />
    ));
  };

  const renderCircle = () => {
    return renderDot();
  };

  return (
    <View style={styles.container(size)}>
      {shape === "horizontal" ? renderDot() : renderCircle()}
    </View>
  );
};

const UniInternalLoadingIndicator = withUnistyles(
  InternalLoadingIndicator,
  (theme) => ({ themeColors: theme.colors }),
);

const Dot: FC<Omit<Props, "size"> & { size: number } & { index: number }> = ({
  color,
  size,
  index,
}) => {
  const translateY = useSharedValue<number>(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  useEffect(() => {
    const centerPoint = ((size / 32) * 8) / 2;
    translateY.value = withDelay(
      index * 150,
      withRepeat(withTiming(centerPoint, { duration: 600 }), -1, true),
    );
  }, [index, size, translateY]);

  return (
    <Animated.View
      key={index}
      style={[styles.dots(size, color), animatedStyle]}
    />
  );
};

export const LoadingIndicator: FC<Props> = (props) => {
  return <UniInternalLoadingIndicator {...props} />;
};

export type LoadingIndicatorProps = Props;

const styles = StyleSheet.create((theme) => ({
  container: (size: number) => ({
    columnGap: (size / 32) * 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  }),
  dots: (size: number, color?: string) => ({
    height: (size / 32) * 8,
    aspectRatio: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.borderRadius.circle,
    backgroundColor: color ?? theme.colors.primary,
    transform: [{ translateY: 0 }],
  }),
}));
