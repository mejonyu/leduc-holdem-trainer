import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./MoveSummaryCard.styles";
import MoveRankingCircle from "./MoveRankingCircle/MoveRankingCircle";
import { useAuth } from "@/hooks/useAuth";

interface MoveSummaryCardProps {
  userMovesWithOnlyRankings: string[] | null;
}

const MoveSummaryCard: React.FC<MoveSummaryCardProps> = ({
  userMovesWithOnlyRankings,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Your Stats</Text>
      </View>
      <MoveRankingCircle moves={userMovesWithOnlyRankings} />
    </View>
  );
};

export default MoveSummaryCard;
