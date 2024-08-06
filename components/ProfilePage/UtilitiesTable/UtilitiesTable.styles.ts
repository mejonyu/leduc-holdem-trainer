import { scaleHeight, scaleWidth } from "@/utils/dimensionScaling";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  table: {
    width: "100%",
    marginTop: scaleHeight(20),
  },
  container: {
    // backgroundColor: "#f4f4f4",
    backgroundColor: "white",
    // borderRadius: scaleHeight(20),
    paddingVertical: scaleHeight(4),
  },
  title: {
    alignSelf: "flex-start",
    fontSize: scaleHeight(16),
    fontWeight: "600",
    marginBottom: scaleHeight(3),
    paddingHorizontal: scaleWidth(3),
  },
  separator: {
    height: scaleHeight(1),
    backgroundColor: "#a6a6a6",
  },
});

export default styles;
