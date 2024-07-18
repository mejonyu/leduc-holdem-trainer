import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ChipStackProps {
  count: number;
}

const ChipStack: React.FC<ChipStackProps> = ({ count }) => {
  // Limit the number of visually rendered chips to improve performance
  const maxVisibleChips = 10;
  const fiveDollarChips = Math.floor(count / 5);
  const oneDollarChips = count % 5;
  const visibleFiveChips = Math.min(fiveDollarChips, maxVisibleChips);
  const visibleOneChips = Math.min(
    oneDollarChips,
    maxVisibleChips - visibleFiveChips
  );

  return (
    <View style={styles.container}>
      {[...Array(visibleFiveChips)].map((_, index) => (
        <View
          key={`five-${index}`}
          style={[styles.chip, styles.fiveDollarChip, { bottom: index * 4 }]}
        />
      ))}
      {[...Array(visibleOneChips)].map((_, index) => (
        <View
          key={`one-${index}`}
          style={[
            styles.chip,
            styles.oneDollarChip,
            { bottom: (visibleFiveChips + index) * 4 },
          ]}
        />
      ))}
      <View
        style={[
          styles.countContainer,
          { bottom: 15 + (visibleFiveChips + visibleOneChips) * 4 },
        ]}
      >
        <Text style={styles.countText}>{count}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignItems: "center",
    justifyContent: "flex-end",
    height: 50,
    width: 40,
  },
  chip: {
    position: "absolute",
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
  },
  fiveDollarChip: {
    backgroundColor: "#3498db",
    borderColor: "#2980b9",
  },
  oneDollarChip: {
    backgroundColor: "#e74c3c",
    borderColor: "#c0392b",
  },
  countContainer: {
    position: "absolute",
    right: -2,
    backgroundColor: "black",
    borderRadius: 10,
    padding: 2,
    width: 17,
    height: 17,
    justifyContent: "center",
  },
  countText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ChipStack;
