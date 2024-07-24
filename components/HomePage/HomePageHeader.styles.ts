import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userInfoText: {
    marginLeft: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: "bold",
  },
  readCount: {
    fontSize: 12,
    color: "gray",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  flameCount: {
    marginRight: 10,
  },
});
