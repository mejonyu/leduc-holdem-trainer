import { View, Text } from "react-native";
import React from "react";
import styles from "./SettingsTable.styles";
import SettingsRow from "./SettingsRow/SettingsRow";

interface SettingsTableProps {
  title: string;
}

const SettingsTable: React.FC<SettingsTableProps> = ({ title }) => {
  return (
    <View style={styles.table}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.container}>
        <SettingsRow title="Change Email" />
        <View style={styles.separator} />
        <SettingsRow title="Edit Name" />
        <View style={styles.separator} />
        <SettingsRow title="Change Password" />
      </View>
    </View>
  );
};

export default SettingsTable;
