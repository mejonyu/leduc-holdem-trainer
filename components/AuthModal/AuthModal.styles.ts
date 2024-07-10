import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  modalHeaderText: {
    fontWeight: "bold",
    fontSize: 22,
  },
  row: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 38,
  },
  modalContent: {
    margin: 20,
    justifyContent: "center",
    alignItems: "stretch",
  },
  heading: {
    textAlign: "center",
    fontSize: 21,
    fontWeight: "500",
    marginBottom: 18,
  },
  terms: {
    textAlign: "center",
    fontSize: 16,
  },
  inputLabel: {
    marginTop: 30,
    marginBottom: 4,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#cdcdcd",
    borderRadius: 3,
    padding: 14,
    marginBottom: 16,
  },
  uneditableInput: {
    borderRadius: 3,
    backgroundColor: "#e6e6e6",
    padding: 14,
    marginBottom: 16,
  },
  continueButton: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 3,
  },
  continueButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subheading: {
    textAlign: "center",
    fontSize: 16,
  },
  forgotPassword: {
    color: "blue",
    textDecorationLine: "underline",
    marginBottom: 20,
  },
  invalidInput: {
    borderColor: "#fcd2cd",
  },
  errorText: {
    color: "#dc303d",
    marginBottom: 16,
  },
});

export default styles;
