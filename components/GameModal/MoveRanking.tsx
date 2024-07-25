import { View, Text } from "react-native";
import React, { SetStateAction } from "react";
import LeducMCCFRGame from "@/lib/game/LeducMCCFRGame";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { scaleHeight, scaleIconSize } from "@/utils/dimensionScaling";
import {
  Strategy,
  player1Strategy,
  player2Strategy,
} from "@/lib/game/LeducMCCFRStrategy";
import styles from "./GameModal.styles";

interface MoveRankingProps {
  moveStrategyWeight: number | null;
  setRankingColor: (newColor: string) => void;
}

const MoveRanking: React.FC<MoveRankingProps> = ({
  moveStrategyWeight,
  setRankingColor,
}) => {
  const getRanking = () => {
    if (moveStrategyWeight !== null) {
      if (moveStrategyWeight >= 0.5) {
        setRankingColor("#6495ED");
        return (
          <View
            style={[
              styles.moveRankingContainer,
              { backgroundColor: "#6495ED" },
            ]}
          >
            <Ionicons
              name="checkmark-done-outline"
              size={scaleIconSize(40)}
              color="black"
            />
            <Text style={styles.moveRankingText}>Optimal</Text>
          </View>
        );
      } else if (moveStrategyWeight >= 0.25) {
        setRankingColor("#72bf6a");
        return (
          <View
            style={[
              styles.moveRankingContainer,
              { backgroundColor: "#72bf6a" },
            ]}
          >
            <Ionicons
              name="checkmark-outline"
              size={scaleIconSize(40)}
              color="black"
            />
            <Text style={styles.moveRankingText}>Good</Text>
          </View>
        );
      } else if (moveStrategyWeight >= 0.05) {
        setRankingColor("#fba01c");
        return (
          <View
            style={[
              styles.moveRankingContainer,
              { backgroundColor: "#fba01c" },
            ]}
          >
            <Entypo
              name="circle-with-minus"
              size={scaleIconSize(24)}
              color="black"
            />
            <Text
              style={[styles.moveRankingText, { marginTop: scaleHeight(5) }]}
            >
              Okay
            </Text>
          </View>
        );
      } else {
        setRankingColor("#F44336");
        return (
          <View
            style={[
              styles.moveRankingContainer,
              { backgroundColor: "#F44336" },
            ]}
          >
            <AntDesign name="warning" size={scaleIconSize(24)} color="black" />
            <Text
              style={[styles.moveRankingText, { marginTop: scaleHeight(5) }]}
            >
              Blunder
            </Text>
          </View>
        );
      }
    }
  };

  return <>{getRanking()}</>;
};

export default MoveRanking;
