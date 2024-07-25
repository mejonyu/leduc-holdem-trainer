import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";

type Ranking = "Optimal" | "Good" | "Okay" | "Blunder";

interface Move {
  id: number;
  ranking: Ranking;
}

interface MoveRankingCircleProps {
  moves: Move[];
}

const MoveRankingCircle: React.FC<MoveRankingCircleProps> = ({ moves }) => {
  const size = 150;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  const rankingColors: Record<Ranking, string> = {
    Optimal: "#6495ED",
    Good: "#72bf6a",
    Okay: "#fba01c",
    Blunder: "#F44336",
  };

  const countMoves = (ranking: Ranking): number =>
    moves.filter((move) => move.ranking === ranking).length;
  const totalMoves = moves.length;

  const rankingCounts: Record<Ranking, number> = {
    Optimal: countMoves("Optimal"),
    Good: countMoves("Good"),
    Okay: countMoves("Okay"),
    Blunder: countMoves("Blunder"),
  };

  let offset = 0;
  const segments = Object.entries(rankingCounts).map(
    ([ranking, count], index) => {
      const percentage = count / totalMoves;
      const strokeDasharray = `${
        circumference * percentage - 1
      } ${circumference}`;
      const segment = (
        <Circle
          key={ranking}
          stroke={rankingColors[ranking as Ranking]}
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
        {segments}
      </Svg>
      <Text style={styles.totalMoves}>{totalMoves}</Text>
      <View style={styles.legend}>
        {(Object.entries(rankingColors) as [Ranking, string][]).map(
          ([ranking, color]) => (
            <View key={ranking} style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: color }]} />
              <Text style={styles.legendText}>
                {ranking}: {rankingCounts[ranking]}
              </Text>
            </View>
          )
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  totalMoves: {
    position: "absolute",
    fontSize: 24,
    fontWeight: "bold",
  },
  legend: {
    marginTop: 20,
    alignItems: "flex-start",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  legendColor: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  legendText: {
    fontSize: 16,
  },
});

export default MoveRankingCircle;
