import { scaleHeight, scaleWidth } from "@/utils/dimensionScaling";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginTop: scaleHeight(40),
    marginBottom: scaleHeight(10),
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
    color: "#6495ED",
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
    color: "#4169E1",
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
