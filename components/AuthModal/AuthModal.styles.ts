import { scaleHeight, scaleWidth } from "@/utils/dimensionScaling";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    borderRadius: scaleHeight(10),
    padding: scaleHeight(20),
    backgroundColor: "white",
  },
  modalHeaderText: {
    fontWeight: "bold",
    fontSize: scaleHeight(22),
  },
  row: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: scaleHeight(38),
  },
  modalContent: {
    marginHorizontal: scaleWidth(20),
    marginVertical: scaleHeight(20),
    justifyContent: "center",
    alignItems: "stretch",
  },
  heading: {
    textAlign: "center",
    fontSize: scaleHeight(21),
    fontWeight: "500",
    marginBottom: scaleHeight(18),
  },
  terms: {
    textAlign: "center",
    fontSize: scaleHeight(16),
  },
  inputLabel: {
    marginTop: scaleHeight(30),
    marginBottom: scaleHeight(4),
    fontWeight: "500",
  },
  input: {
    width: "100%",
    borderWidth: scaleHeight(1),
    borderColor: "#cdcdcd",
    borderRadius: scaleHeight(3),
    paddingHorizontal: scaleWidth(14),
    paddingVertical: scaleHeight(14),
    marginBottom: scaleHeight(16),
  },
  uneditableInput: {
    borderRadius: scaleHeight(3),
    backgroundColor: "#e6e6e6",
    paddingHorizontal: scaleWidth(14),
    paddingVertical: scaleHeight(14),
    marginBottom: scaleHeight(16),
  },
  continueButton: {
    backgroundColor: "black",
    paddingHorizontal: scaleWidth(15),
    paddingVertical: scaleHeight(15),
    borderRadius: scaleHeight(3),
  },
  continueButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: scaleHeight(16),
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: scaleHeight(10),
  },
  backButtonText: {
    fontSize: scaleHeight(24),
    fontWeight: "bold",
  },
  subheading: {
    textAlign: "center",
    fontSize: scaleHeight(16),
  },
  forgotPassword: {
    color: "blue",
    textDecorationLine: "underline",
    marginBottom: scaleHeight(20),
  },
  invalidInput: {
    borderColor: "#fcd2cd",
  },
  errorText: {
    color: "#dc303d",
    marginBottom: scaleHeight(16),
  },
  headerStyle: {
    backgroundColor: "white",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  showButton: {
    position: "absolute",
    right: scaleWidth(10),
    top: scaleHeight(14),
    justifyContent: "center",
  },
  showButtonText: {
    color: "black", // Or any color you prefer
    fontSize: scaleHeight(16),
  },
});

export default styles;
