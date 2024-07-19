import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

// Original dev done for iPhone 15 Pro Max.
const IPHONE_15_PRO_MAX_WIDTH = 430;
const IPHONE_15_PRO_MAX_HEIGHT = 932;

export const scaleHeight = (size: number) => {
  return (size / IPHONE_15_PRO_MAX_HEIGHT) * height;
};

export const scaleWidth = (size: number) => {
  return (size / IPHONE_15_PRO_MAX_WIDTH) * width;
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "black",
    padding: scaleHeight(15),
    borderRadius: 3,
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: scaleHeight(16),
  },
  buttonSubText: {
    marginLeft: scaleWidth(6),
    color: "white",
    fontSize: scaleHeight(12),
  },
});

export default styles;
