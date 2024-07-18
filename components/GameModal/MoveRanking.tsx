import { View, Text } from "react-native";
import React from "react";
import LeducMCCFRGame from "@/lib/game/LeducMCCFRGame";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import styles from "./GameModal.styles";
import {
  player1Strategy,
  player2Strategy,
} from "@/lib/game/LeducMCCFRStrategy";

interface MoveRankingProps {
  game: LeducMCCFRGame | null;
  isPlayer1: boolean;
}

const MoveRanking: React.FC<MoveRankingProps> = ({ game, isPlayer1 }) => {
  const movePlayed = game?.getState().getLastMove() || "";
  let strategy;
  let hand;
  let currentHistory;
  if (!isPlayer1) {
    hand = game?.getState().getP2Card().getRank() || "";
    if (game?.getState().getCommCard()) {
      const commCard = game?.getState().getCommCard();
      hand += `,${commCard}`;
      // Sort them so that lookup keys are uniform.
      const [a, b] = hand.split(",");
      hand = a.localeCompare(b) <= 0 ? `${a},${b}` : `${b},${a}`;
    }
    currentHistory = game?.getState().getHistory().slice(0, -1) || "";
    strategy = player2Strategy[hand][currentHistory];
  } else {
    hand = game?.getState().getP1Card().getRank() || "";
    if (game?.getState().getCommCard()) {
      const commCard = game?.getState().getCommCard();
      hand += `,${commCard}`;
      // Sort them so that lookup keys are uniform.
      const [a, b] = hand.split(",");
      hand = a.localeCompare(b) <= 0 ? `${a},${b}` : `${b},${a}`;
    }
    if (game?.getState().isEndOfFirstRound()) {
      currentHistory = game?.getState().getHistory().slice(0, -2) || "";
    } else {
      currentHistory = game?.getState().getHistory().slice(0, -1) || "";
    }
    strategy = player1Strategy[hand][currentHistory];
  }
  const getRanking = () => {
    const moveStrategyWeight = strategy[movePlayed];
    if (moveStrategyWeight >= 0.5) {
      return (
        <View
          style={[styles.moveRankingContainer, { backgroundColor: "#6495ED" }]}
        >
          <Ionicons name="checkmark-done-outline" size={40} color="black" />
          <Text style={styles.moveRankingText}>Optimal</Text>
        </View>
      );
    } else if (moveStrategyWeight >= 0.25) {
      return (
        <View
          style={[styles.moveRankingContainer, { backgroundColor: "#72bf6a" }]}
        >
          <Ionicons name="checkmark-outline" size={40} color="black" />
          <Text style={styles.moveRankingText}>Good</Text>
        </View>
      );
    } else if (moveStrategyWeight >= 0.05) {
      return (
        <View
          style={[styles.moveRankingContainer, { backgroundColor: "#ffd300" }]}
        >
          <Entypo name="circle-with-minus" size={24} color="black" />
          <Text style={[styles.moveRankingText, { marginTop: 5 }]}>Okay</Text>
        </View>
      );
    } else {
      return (
        <View
          style={[styles.moveRankingContainer, { backgroundColor: "#ff5252" }]}
        >
          <AntDesign name="warning" size={24} color="black" />
          <Text style={[styles.moveRankingText, { marginTop: 5 }]}>
            Blunder
          </Text>
        </View>
      );
    }
  };

  return <>{getRanking()}</>;
};

export default MoveRanking;
