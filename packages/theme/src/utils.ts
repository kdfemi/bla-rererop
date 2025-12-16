import { Dimensions } from "react-native";

let { width, height } = Dimensions.get("window");

export const applyOpacity = (color: string, opacity: number) => {
  const hexOpacity = Math.round((opacity / 100) * 255)
    .toString(16)
    .padStart(2, "0")
    .toUpperCase();
  return `${color}${hexOpacity}`;
};

Dimensions.addEventListener("change", ({ window }) => {
  width = window.width;
  height = window.height;
});

export const guidelineBaseWidth = 390;
export const guidelineBaseHeight = 844;

export const maxFontSizeMultiplier = 1.2;

/**
 * Horizontal Rule is used for measurement that affects the width
 * e.g ``paddingLeft``, ``PaddingRight``, ``PaddingHorizontal``
 * @param size pixel
 * @returns scaled size
 */
export const hr = (size: number, screenWidth = width) =>
  (screenWidth / guidelineBaseWidth) * size;

/**
 * Vertical Rule is used for measurement that affects the height
 * e.g ``paddingTop``, ``PaddingBottom``, ``PaddingVertical``
 * @param size pixel
 * @returns scaled size
 */
export const vr = (size: number, screenHeight = height) =>
  (screenHeight / guidelineBaseHeight) * size;

export const moderateVerticalScale = (size: number, factor = 0.5) =>
  size + (vr(size) - size) * factor;

export const moderateHorizontalScale = (size: number, factor = 0.5) =>
  size + (hr(size) - size) * factor;
