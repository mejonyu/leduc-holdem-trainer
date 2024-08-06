import { scaleHeight, scaleWidth } from "@/utils/dimensionScaling";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    width: "100%",
    // backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: scaleWidth(10),
    paddingRight: scaleWidth(12),
    paddingVertical: scaleHeight(10),
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: scaleWidth(3),
    justifyContent: "center",
    alignItems: "center",
    height: scaleHeight(30),
    width: scaleWidth(30),
  },
  title: {
    color: "black",
  },
});

export default styles;
