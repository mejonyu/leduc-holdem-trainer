import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import styles from "./MoveRankingCircle.styles";

interface MoveRankingCircleProps {
  moves: string[] | null;
}

const RANKING_COLORS: Record<string, string> = {
  optimal: "#6495ED",
  good: "#72bf6a",
  okay: "#fba01c",
  blunder: "#F44336",
};

const MoveRankingCircle: React.FC<MoveRankingCircleProps> = ({ moves }) => {
  const size = 150;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  const countMoves = (ranking: string): number | undefined =>
    moves?.filter((move) => move === ranking).length;

  const rankingCounts: Record<string, number> = {
    optimal: countMoves("optimal") || 0,
    good: countMoves("good") || 0,
    okay: countMoves("okay") || 0,
    blunder: countMoves("blunder") || 0,
  };

  let offset = 0;
  const segments = Object.entries(rankingCounts).map(
    ([ranking, count], index) => {
      const percentage = moves ? count / moves.length : 0;
      if (percentage === 0) return null; // Skip rendering if percentage is 0
      const strokeDasharray = `${
        circumference * percentage - 1
      } ${circumference}`;
      const segment = (
        <Circle
          key={ranking}
          stroke={RANKING_COLORS[ranking]}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={-circumference * offset - (index === 0 ? 0 : 1)}
          strokeLinecap="round"
        />
      );
      offset += percentage;
      return segment;
    }
  );

  const capitalize = (str: string): string => {
    if (str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E0E0E0"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {moves && moves.length > 0 ? segments : null}
      </Svg>
      <View style={styles.middleText}>
        <Text style={styles.totalMoves}>{moves?.length || 0}</Text>
        <Text style={styles.solved}>Solved</Text>
      </View>
      <View style={styles.legendContainer}>
        <View style={styles.legendContent}>
          {(Object.entries(RANKING_COLORS) as [string, string][]).map(
            ([ranking, color]) => (
              <View key={ranking} style={styles.legendItem}>
                <View style={[styles.legendColor]}>
                  <Text style={[styles.rankingCount, { color: color }]}>
                    {rankingCounts[ranking]}
                  </Text>
                </View>
                <Text style={styles.legendText}>{capitalize(ranking)}</Text>
              </View>
            )
          )}
        </View>
      </View>
    </View>
  );
};

export default MoveRankingCircle;
