import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

interface TestProps {
  type: "jack" | "queen" | "king" | "opponent";
}

const Test: React.FC<TestProps> = ({ type }) => {
  const getLetter = () => {
    switch (type) {
      case "jack":
        return "J";
      case "queen":
        return "Q";
      case "king":
        return "K";
      default:
        return "";
    }
  };

  const renderIcon = () => {
    switch (type) {
      case "jack":
        return (
          <Image
            source={require("../../assets/images/jack.png")}
            style={styles.icon}
          />
        );
      case "queen":
        return <FontAwesome6 name="chess-queen" size={50} color="black" />;
      case "king":
        return <FontAwesome6 name="chess-king" size={50} color="black" />;
      case "opponent":
        return (
          <Image
            source={require("../../assets/images/bluff-buddy-black.png")}
            style={styles.icon}
          />
        );
    }
  };

  return (
    <View style={styles.Test}>
      {getLetter() && <Text style={styles.letter}>{getLetter()}</Text>}
      <View style={styles.iconContainer}>{renderIcon()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  Test: {
    width: 100,
    height: 140,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  letter: {
    position: "absolute",
    top: 5,
    left: 5,
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});

export default Test;
