import { scaleHeight, scaleWidth } from "@/utils/dimensionScaling";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userInfoText: {
    marginLeft: scaleWidth(6),
  },
  avatar: {
    width: scaleWidth(40),
    height: scaleHeight(40),
    borderRadius: scaleHeight(20),
    marginRight: scaleWidth(10),
  },
  username: {
    // fontWeight: "bold",
    fontSize: scaleHeight(16),
  },
  readCount: {
    fontSize: scaleHeight(12),
    color: "gray",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  flameCount: {
    marginRight: scaleWidth(10),
  },
});
