import { scaleHeight, scaleWidth } from "@/utils/dimensionScaling";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: scaleWidth(10),
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: scaleHeight(8),
    paddingVertical: scaleHeight(16),
    paddingHorizontal: scaleWidth(12),
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
  modalHeader: {
    // flexDirection: "row",
    position: "relative",
    width: "100%",
    alignItems: "center",
  },
  modalHeaderText: {
    fontWeight: "bold",
    fontSize: scaleHeight(22),
  },
  modalHeaderBackIcon: {
    position: "absolute",
    left: scaleWidth(-6), // To offset padding.
  },
});

export default styles;
