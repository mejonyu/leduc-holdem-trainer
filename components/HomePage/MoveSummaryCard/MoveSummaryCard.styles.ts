import { scaleHeight, scaleWidth } from "@/utils/dimensionScaling";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: scaleHeight(300),
    backgroundColor: "#f4f4f4",
    borderRadius: scaleHeight(20),
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: scaleWidth(20),
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: scaleHeight(18),
    fontWeight: "bold",
    color: "#464c55",
  },
});

export default styles;
