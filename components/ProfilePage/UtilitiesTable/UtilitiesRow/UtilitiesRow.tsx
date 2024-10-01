import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { scaleHeight } from "@/utils/dimensionScaling";
import { AntDesign, Feather } from "@expo/vector-icons";
import styles from "./UtilitiesRow.styles";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import DeleteUserModal from "./DeleteUserModal/DeleteUserModal";
import { triggerButtonHapticFeedback } from "@/utils/haptics";

interface PersonalInformationRowProps {
  title: string;
}

const PersonalInformationRow: React.FC<PersonalInformationRowProps> = ({
  title,
}) => {
  const { signOut } = useAuth();
  const [deleteUserModalVisible, setDeleteUserModalVisible] = useState(false);

  const handleSignOut = () => {
    triggerButtonHapticFeedback();
    try {
      signOut();
      // Navigate back to landing page
      router.back();
      router.back();
      // router.back();
    } catch (error) {
      console.error(error);
    }
  };

  const openDeleteUserModal = () => {
    triggerButtonHapticFeedback();
    setDeleteUserModalVisible(true);
  };

  const closeDeleteUserModal = () => {
    setDeleteUserModalVisible(false);
  };

  const renderRow = () => {
    switch (title) {
      case "Sign Out":
        return (
          <TouchableOpacity style={styles.row} onPress={handleSignOut}>
            <View style={styles.left}>
              <View style={styles.icon}>
                <Feather name="log-out" size={scaleHeight(24)} color="black" />
              </View>
              <Text style={styles.title}>{title}</Text>
            </View>
          </TouchableOpacity>
        );

      case "Delete Account":
        return (
          <TouchableOpacity style={styles.row} onPress={openDeleteUserModal}>
            <View style={styles.left}>
              <View style={styles.icon}>
                <AntDesign
                  name="deleteuser"
                  size={scaleHeight(24)}
                  color="black"
                />
              </View>
              <Text style={styles.title}>{title}</Text>
            </View>
          </TouchableOpacity>
        );
    }
  };

  return (
    <>
      {renderRow()}
      <DeleteUserModal
        modalVisible={deleteUserModalVisible}
        handleCloseModal={closeDeleteUserModal}
      />
    </>
  );
};

export default PersonalInformationRow;
