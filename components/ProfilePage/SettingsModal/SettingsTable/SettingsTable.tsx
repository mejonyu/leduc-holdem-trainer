import { View, Text } from "react-native";
import React from "react";
import styles from "./SettingsTable.styles";
import SettingsRow from "./SettingsRow/SettingsRow";

const SettingsTable: React.FC = () => {
  return (
    <View style={styles.table}>
      <Text style={styles.title}>Personal Information</Text>
      <View style={styles.container}>
        <SettingsRow title="Change Email" />
        <View style={styles.separator} />
        <SettingsRow title="Edit Name" />
      </View>
    </View>
  );
};

export default SettingsTable;
