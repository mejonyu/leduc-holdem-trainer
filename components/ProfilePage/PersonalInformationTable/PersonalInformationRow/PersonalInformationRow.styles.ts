import { scaleHeight, scaleWidth } from "@/utils/dimensionScaling";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    width: "100%",
    // backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleHeight(10),
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  right: {},
  icon: {
    marginRight: scaleWidth(3),
    justifyContent: "center",
    alignItems: "center",
    height: scaleHeight(30),
    width: scaleWidth(30),
  },

  title: {},
  data: {},
});

export default styles;
