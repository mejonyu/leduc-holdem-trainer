import { Dimensions } from "react-native";

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get("window");

// Original dev done for iPhone 15 Pro Max.
const IPHONE_15_PRO_MAX_WIDTH = 430;
const IPHONE_15_PRO_MAX_HEIGHT = 932;

export const scaleHeight = (size: number) => {
  return (size / IPHONE_15_PRO_MAX_HEIGHT) * SCREEN_HEIGHT;
};

export const scaleWidth = (size: number) => {
  return (size / IPHONE_15_PRO_MAX_WIDTH) * SCREEN_WIDTH;
};

export const scaleIconSize = (size: number) => {
  return (size / IPHONE_15_PRO_MAX_HEIGHT) * SCREEN_WIDTH;
};
