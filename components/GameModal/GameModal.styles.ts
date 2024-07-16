import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");
const tableWidth = width * 0.8;
const tableHeight = height * 0.6;

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
    borderWidth: 5,
    borderColor: "black",
  },
  cardContainer: {
    position: "relative",
    backgroundColor: "white",
    width: 70,
    height: 98,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  cardLetter: {
    position: "absolute",
    top: 5,
    left: 5,
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  cardIconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  jackIcon: {
    width: 35,
    height: 35,
    resizeMode: "contain",
  },
  opponentIcon: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
  opponentLabel: {
    position: "absolute",
    backgroundColor: "#eeeeee",
    borderWidth: 2,
    borderRadius: 100,
    padding: 5,
    top: 0,
    left: 0,
  },
  playerLabel: {
    position: "absolute",
    backgroundColor: "#eeeeee",
    borderWidth: 2,
    borderRadius: 100,
    padding: 5,
    bottom: 0,
    right: 0,
  },
  // Add these to your existing styles

  playerCard: {
    position: "absolute",
  },
  opponentCard: {
    position: "absolute",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 30,
  },
});

export default styles;
