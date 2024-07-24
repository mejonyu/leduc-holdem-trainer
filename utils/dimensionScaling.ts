import { Dimensions } from "react-native";

export const { width, height } = Dimensions.get("window");

// Original dev done for iPhone 15 Pro Max.
const IPHONE_15_PRO_MAX_WIDTH = 430;
const IPHONE_15_PRO_MAX_HEIGHT = 932;

export const scaleHeight = (size: number) => {
  return (size / IPHONE_15_PRO_MAX_HEIGHT) * height;
};

export const scaleWidth = (size: number) => {
  return (size / IPHONE_15_PRO_MAX_WIDTH) * width;
};

export const scaleIconSize = (size: number) => {
  return (size / IPHONE_15_PRO_MAX_HEIGHT) * height;
};
