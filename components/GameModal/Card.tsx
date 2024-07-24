import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { scaleIconSize } from "@/utils/dimensionScaling";
import styles from "./GameModal.styles";

interface CardProps {
  type: string;
  // revealed: boolean;
}

const Card: React.FC<CardProps> = ({ type }) => {
  const getLetter = () => {
    switch (type) {
      case "J":
        return "J";
      case "Q":
        return "Q";
      case "K":
        return "K";
      case "deck":
        return "";
    }
  };

  const renderIcon = () => {
    // if (!revealed) {
    //   return (
    //     <Image
    //       source={require("../../assets/images/bluff-buddy-logo-white.png")}
    //       style={styles.opponentIcon}
    //     />
    //   );
    // }
    switch (type) {
      case "J":
        return (
          <Image
            source={require("../../assets/images/jack.png")}
            style={styles.jackIcon}
          />
        );
      case "Q":
        return (
          <FontAwesome6
            name="chess-queen"
            size={scaleIconSize(30)}
            color="black"
          />
        );
      case "K":
        return (
          <FontAwesome5 name="crown" size={scaleIconSize(27)} color="black" />
        );
      case "back":
        return (
          <Image
            source={require("../../assets/images/bluff-buddy-logo-white.png")}
            style={styles.opponentIcon}
          />
        );
      case "deck":
        return (
          <Image
            source={require("../../assets/images/bluff-buddy-logo-white.png")}
            style={styles.opponentIcon}
          />
        );
    }
  };

  // return (
  //   <View
  //     style={[
  //       styles.frontCardContainer,
  //       !revealed ? { backgroundColor: "black" } : null,
  //     ]}
  //   >
  //     {getLetter() && <Text style={styles.cardLetter}>{getLetter()}</Text>}
  //     <View style={styles.cardIconContainer}>{renderIcon()}</View>
  //   </View>
  // );

  return (
    <View
      style={[
        styles.cardContainer,
        type === "back" || type === "deck"
          ? { backgroundColor: "black" }
          : null,
      ]}
    >
      {getLetter() && <Text style={styles.cardLetter}>{getLetter()}</Text>}
      <View style={styles.cardIconContainer}>{renderIcon()}</View>
    </View>
  );
};

export default Card;
