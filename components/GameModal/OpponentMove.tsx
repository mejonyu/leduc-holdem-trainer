import { View, Text } from "react-native";
import React from "react";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import styles, { scaleHeight, scaleIconSize } from "./GameModal.styles";

interface OpponentMoveProps {
  move: string;
}

const OpponentMove: React.FC<OpponentMoveProps> = ({ move }) => {
  const renderMoveContent = () => {
    switch (move) {
      case "x":
        return (
          <>
            <Feather name="check-circle" size={scaleHeight(28)} color="black" />
            <Text style={styles.opponentMoveText}>Check</Text>
          </>
        );
      case "r":
        return (
          <>
            <Feather name="trending-up" size={scaleHeight(36)} color="black" />
            <Text style={[styles.opponentMoveText, { marginTop: -6 }]}>
              Raise
            </Text>
          </>
        );
      case "c":
        return (
          <>
            <Feather name="phone-call" size={30} color="black" />
            <Text style={styles.opponentMoveText}>Call</Text>
          </>
        );
      case "f":
        return (
          <>
            <FontAwesome6
              name="folder-open"
              size={scaleHeight(30)}
              color="black"
            />
            <Text style={styles.opponentMoveText}>Fold</Text>
          </>
        );
    }
  };

  return <>{renderMoveContent()}</>;
};

export default OpponentMove;
