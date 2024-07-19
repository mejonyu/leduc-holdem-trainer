import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

// Original dev done for iPhone 15 Pro Max.
const IPHONE_15_PRO_MAX_WIDTH = 430;
const IPHONE_15_PRO_MAX_HEIGHT = 932;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "black",
    padding: (15 / IPHONE_15_PRO_MAX_HEIGHT) * height,
    borderRadius: 3,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: (16 / IPHONE_15_PRO_MAX_HEIGHT) * height,
  },
});

export default styles;
