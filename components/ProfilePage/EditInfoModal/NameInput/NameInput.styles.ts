import { scaleHeight, scaleWidth } from "@/utils/dimensionScaling";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderWidth: scaleHeight(1),
    borderColor: "#cdcdcd",
    borderRadius: scaleHeight(3),
    paddingHorizontal: scaleWidth(14),
    paddingVertical: scaleHeight(14),
    marginBottom: scaleHeight(16),
  },
  invalidInput: {
    borderColor: "#fcd2cd",
  },
});

export default styles;
