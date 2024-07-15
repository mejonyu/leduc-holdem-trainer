import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");
const tableWidth = width * 0.8;
const tableHeight = height * 0.7;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  pokerTable: {
    width: tableWidth,
    height: tableHeight,
    backgroundColor: "#cccccc",
    borderRadius: tableWidth / 2,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 10,
    borderColor: "black",
  },
  cardContainer: {
    width: 100,
    height: 140,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  cardLetter: {
    position: "absolute",
    top: 5,
    left: 5,
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  cardIconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  jackIcon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  opponentIcon: {
    width: 92,
    height: 92,
    resizeMode: "contain",
  },
});

export default styles;
