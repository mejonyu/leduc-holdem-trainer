import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import styles from "./GameModal.styles";

interface CardProps {
  type: "jack" | "queen" | "king" | "opponent";
}

const Card: React.FC<CardProps> = ({ type }) => {
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
            style={styles.jackIcon}
          />
        );
      case "queen":
        return <FontAwesome6 name="chess-queen" size={50} color="black" />;
      case "king":
        return <FontAwesome5 name="crown" size={40} color="black" />;
      case "opponent":
        return (
          <Image
            source={require("../../assets/images/bluff-buddy-logo-white.png")}
            style={styles.opponentIcon}
          />
        );
    }
  };

  return (
    <View
      style={[
        styles.cardContainer,
        type === "opponent" ? { backgroundColor: "black" } : null,
      ]}
    >
      {getLetter() && <Text style={styles.cardLetter}>{getLetter()}</Text>}
      <View style={styles.cardIconContainer}>{renderIcon()}</View>
    </View>
  );
};

export default Card;
