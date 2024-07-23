import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

// Original dev done for iPhone 15 Pro Max.
const IPHONE_15_PRO_MAX_WIDTH = 430;
const IPHONE_15_PRO_MAX_HEIGHT = 932;

export const scaleHeight = (size: number) => {
  return (size / IPHONE_15_PRO_MAX_HEIGHT) * height;
};

export const scaleWidth = (size: number) => {
  return (size / IPHONE_15_PRO_MAX_WIDTH) * width;
};

export const scaleIconSize = (size: number) => {
  return (size / IPHONE_15_PRO_MAX_HEIGHT) * height;
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // padding: 20,
    paddingVertical: scaleHeight(20),
    paddingHorizontal: scaleWidth(20),
    backgroundColor: "white",
  },
  pokerTable: {
    width: width * 0.8,
    height: height * 0.6,
    backgroundColor: "#cccccc",
    borderRadius: (width * 0.8) / 2,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: "black",
  },
  cardContainer: {
    position: "relative",
    backgroundColor: "white",
    width: scaleWidth(70),
    height: scaleHeight(98),
    borderRadius: 10,
    borderWidth: scaleWidth(2),
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: scaleWidth(2),
      height: scaleHeight(2),
    },
    shadowOpacity: 1,
    shadowRadius: scaleHeight(5),
  },
  cardLetter: {
    position: "absolute",
    top: scaleHeight(5),
    left: scaleWidth(5),
    fontSize: scaleHeight(18),
    fontWeight: "bold",
    color: "black",
  },
  cardIconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  jackIcon: {
    width: scaleWidth(35),
    height: scaleHeight(35),
    resizeMode: "contain",
  },
  opponentIcon: {
    width: scaleWidth(70),
    height: scaleHeight(70),
    resizeMode: "contain",
  },
  opponentLabel: {
    position: "absolute",
    backgroundColor: "#eeeeee",
    borderWidth: scaleHeight(2),
    borderRadius: 100,
    padding: scaleHeight(5),
    top: 0,
    left: 0,
  },
  playerLabel: {
    position: "absolute",
    backgroundColor: "#eeeeee",
    borderWidth: scaleHeight(2),
    borderRadius: 100,
    padding: scaleHeight(5),
    bottom: 0,
    right: 0,
  },
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
    marginTop: scaleHeight(50),
    paddingHorizontal: scaleWidth(30),
  },
  cardGlow: {
    shadowColor: "red",
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  continueContainer: {
    position: "absolute",
    bottom: scaleHeight(33),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: scaleWidth(30),
  },
  continueButton: {
    // backgroundColor: "#4CAF53",
    paddingVertical: scaleHeight(15),
    paddingHorizontal: scaleWidth(15),
    borderRadius: 3,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  continueButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: scaleHeight(16),
  },
  continueButtonIcon: {
    position: "absolute",
    right: scaleWidth(8),
    top: scaleHeight(15),
  },
  moveRankingContainer: {
    position: "absolute",
    borderRadius: scaleHeight(6),
    borderWidth: scaleHeight(2),
    top: scaleHeight(-215),
    alignItems: "center",
    justifyContent: "center",
    width: scaleWidth(100),
    height: scaleHeight(80),
  },
  moveRankingText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  playerBetChips: {
    position: "absolute",
    bottom: scaleHeight(66),
    zIndex: 3,
  },
  opponentBetChips: {
    position: "absolute",
    top: scaleHeight(49),
    zIndex: 3,
  },
  middleChipStack: {
    position: "absolute",
    bottom: scaleHeight(181),
    zIndex: 3,
  },
  chipContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "flex-end",
    height: scaleHeight(50),
    width: scaleWidth(40),
  },
  chip: {
    position: "absolute",
    width: scaleWidth(30),
    height: scaleHeight(30),
    borderRadius: 15,
    borderWidth: scaleHeight(2),
  },
  fiveDollarChip: {
    backgroundColor: "#3498db",
    borderColor: "#2980b9",
  },
  oneDollarChip: {
    backgroundColor: "#e74c3c",
    borderColor: "#c0392b",
  },
  chipCountContainer: {
    position: "absolute",
    right: scaleWidth(-2),
    backgroundColor: "black",
    borderRadius: 10,
    paddingVertical: scaleHeight(2),
    paddingHorizontal: scaleWidth(2),
    width: scaleWidth(17),
    height: scaleHeight(17),
    justifyContent: "center",
  },
  countText: {
    color: "white",
    fontSize: scaleHeight(10),
    fontWeight: "bold",
    textAlign: "center",
  },
  opponentMoveContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: scaleHeight(110),
    borderRadius: scaleHeight(6),
    borderWidth: scaleHeight(2),
    width: scaleWidth(100),
    height: scaleHeight(80),
    backgroundColor: "white",
  },
  opponentMoveText: {
    color: "black",
    fontWeight: "bold",
    // fontSize: scaleHeight(20),
  },
});

export default styles;
