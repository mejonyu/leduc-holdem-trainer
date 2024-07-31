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
    paddingHorizontal: scaleWidth(16),
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
    left: scaleWidth(-10), // To offset padding.
  },
  errorText: {
    color: "#dc303d",
    marginBottom: scaleHeight(16),
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  modalForm: {
    flex: 1,
    width: "100%",
  },
  inputLabel: {
    marginTop: scaleHeight(24),
    marginBottom: scaleHeight(4),
    flexDirection: "row",
    alignItems: "center",
  },
  inputLabelIcon: {
    marginRight: scaleWidth(2),
    justifyContent: "center",
    alignItems: "center",
    height: scaleHeight(30),
    width: scaleWidth(30),
  },
  inputLabelText: {
    fontWeight: "500",
  },
});

export default styles;
