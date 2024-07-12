import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingBottom: 10,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 20,
  },
  logo: {
    width: 300,
    height: 280,
  },
  chip: {
    position: "absolute",
    width: 80,
    height: 80,
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
  subheading: {
    marginTop: -60,
    marginBottom: 16,
    paddingHorizontal: 25,
    textAlign: "center",
    fontSize: 16,
  },
});

export default styles;
