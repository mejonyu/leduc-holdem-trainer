import { View, Text } from "react-native";
import React from "react";
import styles from "./UtilitiesTable.styles";
import UtilitiesRow from "./UtilitiesRow/UtilitiesRow";

const UtilitiesTable: React.FC = ({}) => {
  return (
    <View style={styles.table}>
      <Text style={styles.title}>Utilities</Text>
      <View style={styles.container}>
        <UtilitiesRow title={"Sign Out"} />
        <View style={styles.separator} />
        <UtilitiesRow title={"Delete Account"} />
      </View>
    </View>
  );
};

export default UtilitiesTable;
