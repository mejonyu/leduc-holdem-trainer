import { scaleHeight, scaleWidth } from "@/utils/dimensionScaling";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: scaleHeight(360),
    width: scaleWidth(300),
    backgroundColor: "#f4f4f4",
    borderRadius: scaleHeight(20),
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: scaleWidth(13),
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: scaleHeight(26),
  },
  title: {
    fontSize: scaleHeight(18),
    fontWeight: "bold",
    color: "#464c55",
  },
  subTitle: {
    marginTop: scaleHeight(5),
    color: "#979da5",
    fontSize: scaleHeight(12),
  },
});

export default styles;
