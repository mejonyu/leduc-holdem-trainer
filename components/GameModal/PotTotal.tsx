import { View, Text } from "react-native";
import React from "react";
import styles from "./GameModal.styles";

interface PotTotalProps {
  total: number;
}

const PotTotal: React.FC<PotTotalProps> = ({ total }) => {
  return (
    <>
      <Text style={styles.potTotalSubText}>Total: </Text>
      <Text style={styles.potTotalText}>{total}</Text>
    </>
  );
};

export default PotTotal;
