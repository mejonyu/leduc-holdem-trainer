import { scaleHeight, scaleWidth } from "@/utils/dimensionScaling";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // container: {
  //   position: "relative",
  // },
  // avatar: {
  //   width: 100,
  //   height: 100,
  //   borderRadius: 50,
  // },
  // editIconContainer: {
  //   position: "absolute",
  //   right: 0,
  //   bottom: 0,
  //   backgroundColor: "rgba(0,0,0,0.5)",
  //   borderRadius: 15,
  //   padding: 5,
  // },
  profilePhotoContainer: {
    alignSelf: "center",
    position: "relative",
  },
  profilePhoto: {
    width: scaleHeight(100),
    height: scaleHeight(100),
    borderRadius: scaleHeight(50),
    justifyContent: "center",
    alignItems: "center",
  },
  editIconContainer: {
    position: "absolute",
    bottom: scaleHeight(4),
    right: scaleWidth(4),
    backgroundColor: "white",
    borderRadius: scaleHeight(30),
    padding: scaleHeight(4),
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: scaleWidth(10),
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: scaleHeight(8),
    paddingVertical: scaleHeight(16),
    paddingHorizontal: scaleWidth(16),
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
  modalHeader: {
    // flexDirection: "row",
    position: "relative",
    width: "100%",
    alignItems: "center",
  },
  modalHeaderText: {
    fontWeight: "bold",
    fontSize: scaleHeight(22),
  },
  modalHeaderBackIcon: {
    position: "absolute",
    left: scaleWidth(-10), // To offset padding.
  },
  scrollViewContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    width: "100%",
  },
  imageContainer: {
    width: scaleWidth(110),
    height: scaleWidth(110),
    margin: scaleWidth(8),
    justifyContent: "center",
    alignItems: "center",
  },
  optionImage: {
    width: scaleWidth(110),
    height: scaleHeight(110),
    // borderRadius: 30,
  },
  optionLabel: {
    textAlign: "center",
  },
});

export default styles;
