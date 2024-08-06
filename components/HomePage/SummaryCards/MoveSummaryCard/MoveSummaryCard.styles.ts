import { scaleHeight, scaleWidth } from "@/utils/dimensionScaling";
import { StyleSheet } from "react-native";

export const CARD_WIDTH = scaleWidth(320);
export const CARD_SPACING = scaleWidth(10);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: scaleHeight(360),
    width: CARD_WIDTH,
    backgroundColor: "#f4f4f4",
    borderRadius: scaleHeight(20),
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: CARD_SPACING,
    shadowColor: "gray",
    shadowRadius: scaleHeight(10),
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 0 },
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
