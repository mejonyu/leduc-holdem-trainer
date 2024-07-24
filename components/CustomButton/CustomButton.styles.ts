import { scaleHeight, scaleWidth } from "@/utils/dimensionScaling";
import { Dimensions, StyleSheet } from "react-native";

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
