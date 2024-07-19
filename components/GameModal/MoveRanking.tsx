import { View, Text } from "react-native";
import React, { SetStateAction } from "react";
import LeducMCCFRGame from "@/lib/game/LeducMCCFRGame";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import styles, { scaleHeight, scaleIconSize } from "./GameModal.styles";
import {
  player1Strategy,
  player2Strategy,
} from "@/lib/game/LeducMCCFRStrategy";

interface MoveRankingProps {
  game: LeducMCCFRGame | null;
  isPlayer1: boolean;
  setComputedStrategy: React.Dispatch<SetStateAction<{}>>;
  setRankingColor: React.Dispatch<SetStateAction<string>>;
}

const MoveRanking: React.FC<MoveRankingProps> = ({
  game,
  isPlayer1,
  setComputedStrategy,
  setRankingColor,
}) => {
  const computeStrategy = () => {
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
    return strategy;
  };

  const getRanking = () => {
    const movePlayed = game?.getState().getLastMove() || "";
    const strategy = computeStrategy();
    setComputedStrategy(strategy);
    const moveStrategyWeight = strategy[movePlayed];
    if (moveStrategyWeight >= 0.5) {
      setRankingColor("#6495ED");
      return (
        <View
          style={[styles.moveRankingContainer, { backgroundColor: "#6495ED" }]}
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
          style={[styles.moveRankingContainer, { backgroundColor: "#72bf6a" }]}
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
      setRankingColor("#ffd300");
      return (
        <View
          style={[styles.moveRankingContainer, { backgroundColor: "#ffd300" }]}
        >
          <Entypo
            name="circle-with-minus"
            size={scaleIconSize(24)}
            color="black"
          />
          <Text style={[styles.moveRankingText, { marginTop: scaleHeight(5) }]}>
            Okay
          </Text>
        </View>
      );
    } else {
      setRankingColor("#cc0000");
      return (
        <View
          style={[styles.moveRankingContainer, { backgroundColor: "#cc0000" }]}
        >
          <AntDesign name="warning" size={scaleIconSize(24)} color="black" />
          <Text style={[styles.moveRankingText, { marginTop: scaleHeight(5) }]}>
            Blunder
          </Text>
        </View>
      );
    }
  };

  return <>{getRanking()}</>;
};

export default MoveRanking;
