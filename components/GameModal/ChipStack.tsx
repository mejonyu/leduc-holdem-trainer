import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ChipStackProps {
  count: number;
}

const ChipStack: React.FC<ChipStackProps> = ({ count }) => {
  // Limit the number of visually rendered chips to improve performance
  const maxVisibleChips = 10;
  const visibleChips = Math.min(count, maxVisibleChips);

  return (
    <View style={styles.container}>
      {[...Array(visibleChips)].map((_, index) => (
        <View
          key={index}
          style={[
            styles.chip,
            { bottom: index * 4 }, // Offset each chip slightly
          ]}
        />
      ))}
      <View style={[styles.countContainer, { bottom: 15 + count * 4 }]}>
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
    backgroundColor: "#e74c3c",
    borderWidth: 2,
    borderColor: "#c0392b",
  },
  countContainer: {
    position: "absolute",
    right: 0,
    backgroundColor: "black",
    borderRadius: 10,
    padding: 2,
    width: 15,
    height: 15,
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
