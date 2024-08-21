import { scaleHeight, scaleWidth } from "@/utils/dimensionScaling";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
    contentTop: {
        alignItems: "center",
        width: "100%",
        marginVertical: scaleHeight(28),
    },
    imageContainer: {
        width: scaleWidth(200),
        height: scaleHeight(180),
    },
    image: {
        width: "100%",
        height: "100%",
    },
    topText: {
        fontSize: scaleHeight(18),
        fontWeight: "bold",
    },
    contentMiddle: {
        alignItems: "center",
    },
    middleHeaderText: {
        fontSize: scaleHeight(15),
        fontWeight: "bold",
        marginBottom: scaleHeight(4),
    },
    middleText: {
        // fontSize: scaleHeight(12),
        textAlign: "center",
    },
    middleEmphText: {
        fontWeight: "bold",
        fontStyle: "italic",
    },
    contentEnd: {
        marginTop: scaleHeight(28),
        alignItems: "center",
        width: "100%",
    },
});

export default styles;
