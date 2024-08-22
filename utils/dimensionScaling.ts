import { Dimensions } from "react-native";

let { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Original dev done for iPhone 15 Pro Max.
const IPHONE_15_PRO_MAX_WIDTH = 430;
const IPHONE_15_PRO_MAX_HEIGHT = 932;

const IPHONE_15_WIDTH_TO_HEIGHT = IPHONE_15_PRO_MAX_WIDTH /
  IPHONE_15_PRO_MAX_HEIGHT;

SCREEN_WIDTH = SCREEN_HEIGHT * IPHONE_15_WIDTH_TO_HEIGHT;

export { SCREEN_HEIGHT, SCREEN_WIDTH };

export const scaleHeight = (size: number) => {
  return (size / IPHONE_15_PRO_MAX_HEIGHT) * SCREEN_HEIGHT;
};

export const scaleWidth = (size: number) => {
  return (size / IPHONE_15_PRO_MAX_WIDTH) * SCREEN_WIDTH;
};

export const scaleIconSize = (size: number) => {
  return (size / IPHONE_15_PRO_MAX_HEIGHT) * SCREEN_HEIGHT;
};
