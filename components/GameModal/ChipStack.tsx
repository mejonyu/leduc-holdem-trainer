import React from "react";
import { View, Text, StyleSheet } from "react-native";
import styles, { scaleHeight } from "./GameModal.styles";

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
    <View style={styles.chipContainer}>
      {[...Array(visibleFiveChips)].map((_, index) => (
        <View
          key={`five-${index}`}
          style={[
            styles.chip,
            styles.fiveDollarChip,
            { bottom: scaleHeight(index * 4) },
          ]}
        />
      ))}
      {[...Array(visibleOneChips)].map((_, index) => (
        <View
          key={`one-${index}`}
          style={[
            styles.chip,
            styles.oneDollarChip,
            { bottom: scaleHeight((visibleFiveChips + index) * 4) },
          ]}
        />
      ))}
      <View
        style={[
          styles.chipCountContainer,
          {
            bottom: scaleHeight(15 + (visibleFiveChips + visibleOneChips) * 4),
          },
        ]}
      >
        <Text style={styles.countText}>{count}</Text>
      </View>
    </View>
  );
};

export default ChipStack;
