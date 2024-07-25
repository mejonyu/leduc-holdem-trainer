import { View, Text } from "react-native";
import React from "react";
import styles from "./MoveSummaryCard.styles";
import MoveRankingCircle from "./MoveRankingCircle/MoveRankingCircle";

type Ranking = "Optimal" | "Good" | "Okay" | "Blunder";
interface Move {
  id: number;
  ranking: Ranking;
}
const MoveSummaryCard = () => {
  const moves: Move[] = [
    { id: 1, ranking: "Optimal" },
    { id: 2, ranking: "Good" },
    { id: 3, ranking: "Good" },
    { id: 4, ranking: "Okay" },
    { id: 5, ranking: "Blunder" },
    // ... more moves
  ];
  return (
    <View style={styles.container}>
      <MoveRankingCircle moves={moves} />
      <Text>MoveSummaryCard</Text>
    </View>
  );
};

export default MoveSummaryCard;
