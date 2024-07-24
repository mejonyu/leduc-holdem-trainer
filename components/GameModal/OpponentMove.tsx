import { View, Text } from "react-native";
import React from "react";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { scaleHeight, scaleIconSize } from "@/utils/dimensionScaling";
import styles from "./GameModal.styles";

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
            <Feather name="trending-up" size={scaleHeight(32)} color="black" />
            <Text style={[styles.opponentMoveText]}>Raise</Text>
          </>
        );
      case "c":
        return (
          <>
            <Feather name="phone-call" size={28} color="black" />
            <Text style={[styles.opponentMoveText, { marginTop: 8 }]}>
              Call
            </Text>
          </>
        );
      case "f":
        return (
          <>
            <FontAwesome6
              name="folder-open"
              size={scaleHeight(28)}
              color="black"
            />
            <Text style={[styles.opponentMoveText, { marginTop: 8 }]}>
              Fold
            </Text>
          </>
        );
    }
  };

  return <>{renderMoveContent()}</>;
};

export default OpponentMove;
