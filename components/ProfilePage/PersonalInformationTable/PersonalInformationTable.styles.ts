import { scaleHeight, scaleWidth } from "@/utils/dimensionScaling";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    // borderRadius: scaleHeight(20),
    paddingVertical: scaleHeight(4),
    // borderWidth: scaleHeight(0.5),
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
