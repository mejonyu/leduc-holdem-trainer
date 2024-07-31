import { View, Text } from "react-native";
import React from "react";
import styles from "./PersonalInformationTable.styles";
import PersonalInformationRow from "./PersonalInformationRow/PersonalInformationRow";

interface PersonalInformationTableProps {
  email: string | undefined;
  name: string | null;
  refetchData: () => Promise<void>;
}

const PersonalInformationTable: React.FC<PersonalInformationTableProps> = ({
  email,
  name,
  refetchData,
}) => {
  return (
    <View style={styles.container}>
      <Text>PersonalInformationTable</Text>
      <PersonalInformationRow title={"Email"} data={email ? email : null} />
      <PersonalInformationRow
        title={"Name"}
        data={name}
        refetchData={refetchData}
      />
    </View>
  );
};

export default PersonalInformationTable;
