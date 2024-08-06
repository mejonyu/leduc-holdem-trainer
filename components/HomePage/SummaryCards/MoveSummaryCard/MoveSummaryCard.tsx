import { View, Text, Animated } from "react-native";
import React from "react";
import styles, { CARD_SPACING, CARD_WIDTH } from "./MoveSummaryCard.styles";
import MoveRankingCircle from "../MoveRankingCircle/MoveRankingCircle";

interface MoveSummaryCardProps {
  title: string;
  userMovesWithOnlyRankings: string[] | null;
  thisWeekMoveCount: number;
  index: number;
  scrollX: Animated.Value;
}

const MoveSummaryCard: React.FC<MoveSummaryCardProps> = ({
  title,
  userMovesWithOnlyRankings,
  thisWeekMoveCount,
  index,
  scrollX,
}) => {
  const inputRange = [
    (index - 1) * (CARD_WIDTH + CARD_SPACING),
    index * (CARD_WIDTH + CARD_SPACING),
    (index + 1) * (CARD_WIDTH + CARD_SPACING),
  ];

  const rotate = scrollX.interpolate({
    inputRange,
    outputRange: ["3deg", "0deg", "-3deg"],
    extrapolate: "clamp",
  });

  return (
    <Animated.View style={[styles.container, { transform: [{ rotate }] }]}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>
          +{thisWeekMoveCount} solved this week
        </Text>
      </View>
      <MoveRankingCircle moves={userMovesWithOnlyRankings} />
    </Animated.View>
  );
};

export default MoveSummaryCard;
