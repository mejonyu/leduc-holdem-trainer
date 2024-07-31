import { View, Text } from "react-native";
import React from "react";
import styles from "./PersonalInformationTable.styles";
import PersonalInformationRow from "./PersonalInformationRow/PersonalInformationRow";

interface PersonalInformationTableProps {
  email: string | undefined;
  name: string | null;
}

const PersonalInformationTable: React.FC<PersonalInformationTableProps> = ({
  email,
  name,
}) => {
  return (
    <View style={styles.container}>
      <Text>PersonalInformationTable</Text>
      <PersonalInformationRow title={"Email"} data={email ? email : null} />
      <PersonalInformationRow title={"Name"} data={name} />
    </View>
  );
};

export default PersonalInformationTable;
