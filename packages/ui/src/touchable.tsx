import {
  Animated,
  GestureResponderEvent,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import React, { forwardRef, useEffect, useRef } from "react";

export type TouchableProps = TouchableOpacityProps & {
  animatedScale?: number;
};

export const Touchable = forwardRef<View, TouchableProps>(
  (
    {
      children,
      disabled,
      onPressIn,
      onPressOut,
      onPress,
      style,
      animatedScale = 0.99,
      activeOpacity,
      ...props
    },
    ref,
  ) => {
    const animation = useRef(new Animated.Value(0)).current;
    const previousDisabledState = useRef(disabled);

    const Touch = TouchableOpacity;

    useEffect(() => {
      if (previousDisabledState.current === true && disabled === false) {
        Animated.sequence([expandButton(), compressButton()]).start();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [disabled]);

    const scale = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, animatedScale],
    });

    const compressButton = () => {
      return Animated.spring(animation, {
        toValue: 1,
        useNativeDriver: true,
      });
    };

    const expandButton = () => {
      return Animated.spring(animation, {
        toValue: 0,
        useNativeDriver: true,
      });
    };

    const handlePressIn = (e: GestureResponderEvent) => {
      compressButton().start();
      onPressIn?.(e);
    };

    const handlePressOut = (e: GestureResponderEvent) => {
      expandButton().start();
      onPressOut?.(e);
    };

    const handlePress = (e: GestureResponderEvent) => {
      onPress?.(e);
    };

    return (
      <Touch
        ref={ref}
        {...(props as any)}
        style={[style, { transform: [{ scale }] }]}
        activeOpacity={activeOpacity ?? 0.8}
        disabled={disabled}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {children}
      </Touch>
    );
  },
);

Touchable.displayName = "Touchable";
