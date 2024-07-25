import { scaleHeight, scaleWidth } from "@/utils/dimensionScaling";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginVertical: scaleHeight(40),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayContainer: {
    position: "relative",
    alignItems: "center",
    width: scaleWidth(40),
  },
  hasEntryDayName: {
    marginTop: scaleHeight(9),
    fontWeight: "bold",
    color: "#fba01c",
  },
  missingEntryDayName: {
    marginTop: scaleHeight(9),
    fontWeight: "bold",
    color: "#45a4b9",
  },
  emptyTodayDayName: {
    marginTop: scaleHeight(9),
    fontWeight: "bold",
    color: "#979da5",
  },
  emptyDayName: {
    marginTop: scaleHeight(9),
    color: "#cbcbcb",
  },
  hasEntryDayNumber: {
    fontWeight: "bold",
    color: "#F27D0C",
  },
  missingEntryDayNumber: {
    fontWeight: "bold",
    color: "#10667e",
  },
  emptyTodayDayNumber: {
    fontWeight: "bold",
    color: "#464c55",
  },
  emptyDayNumber: {
    color: "#a6a6a6",
  },
  connectingLine: {
    position: "absolute",
    left: scaleWidth(-18),
    top: scaleHeight(-1),
  },
});

export default styles;
