import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import styles, { scaleIconSize } from "./GameModal.styles";

interface OpponentMoveProps {
  move: string;
}

const OpponentMove: React.FC<OpponentMoveProps> = ({ move }) => {
  const renderMoveContent = () => {
    switch (move) {
      case "x":
        return (
          <>
            <Ionicons
              name="checkmark-outline"
              size={scaleIconSize(40)}
              color="black"
            />
            <Text>Opponent Checks</Text>
          </>
        );
    }
  };

  return (
    <View style={styles.opponentMoveContainer}>{renderMoveContent()}</View>
  );
};

export default OpponentMove;
