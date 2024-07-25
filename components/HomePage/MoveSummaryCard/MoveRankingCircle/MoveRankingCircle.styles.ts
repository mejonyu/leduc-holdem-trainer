import { scaleHeight, scaleWidth } from "@/utils/dimensionScaling";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  legendContainer: {
    marginTop: scaleHeight(28),
    paddingHorizontal: scaleWidth(35),
  },
  legendContent: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: "#eaeaea",
    paddingVertical: scaleHeight(10),
    paddingHorizontal: scaleWidth(20),
    borderRadius: scaleHeight(10),
  },
  legendItem: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 5,
  },
  legendColor: {
    // width: scaleWidth(40),
    // height: scaleWidth(40),
    // borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 2,
  },
  legendText: {
    fontSize: scaleHeight(13),
    color: "#464c55",
    fontWeight: "600",
  },
  rankingCount: {
    color: "#464c55",
    fontWeight: "bold",
    fontSize: scaleHeight(13),
  },
  middleText: {
    position: "absolute",
    top: scaleHeight(48),
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  totalMoves: {
    fontSize: scaleHeight(30),
    fontWeight: "bold",
    color: "#464c55",
  },
  solved: {
    fontSize: scaleHeight(18),
    color: "#464c55",
  },
});

export default styles;
