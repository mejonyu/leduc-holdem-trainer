import { scaleHeight, scaleWidth } from "@/utils/dimensionScaling";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: scaleHeight(5),
    borderBottomWidth: 0.25,
    borderBottomColor: "#a6a6a6",
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userInfoText: {
    marginLeft: scaleWidth(6.5),
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
    color: "#a6a6a6",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  flameCount: {
    marginLeft: scaleWidth(2.5),
    fontWeight: "bold",
    // marginRight: scaleWidth(10),
  },
});
