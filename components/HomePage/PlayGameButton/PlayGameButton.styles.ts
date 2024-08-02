import { scaleHeight, scaleWidth } from "@/utils/dimensionScaling";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: scaleHeight(20),
    paddingHorizontal: scaleWidth(40),
    borderRadius: scaleHeight(8),
    marginTop: scaleHeight(-10),
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: scaleHeight(20),
  },
});

export default styles;
