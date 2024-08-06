import { scaleHeight, scaleWidth } from "@/utils/dimensionScaling";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f4f4f4",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: scaleHeight(20),
    paddingHorizontal: scaleWidth(40),
    borderRadius: scaleHeight(8),
    marginTop: scaleHeight(-10),
    borderWidth: scaleHeight(2),
    borderColor: "#464c55",
    // shadowColor: "black",
    // shadowRadius: 5,
    // shadowOpacity: 0.5,
    // shadowOffset: { width: 0, height: 0 },
  },
  buttonText: {
    color: "#464c55",
    fontWeight: "bold",
    fontSize: scaleHeight(20),
  },
});

export default styles;
