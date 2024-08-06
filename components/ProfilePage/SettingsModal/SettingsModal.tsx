import { View, Text, Modal } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { scaleHeight } from "@/utils/dimensionScaling";
import styles from "./SettingsModal.styles";
import SettingsTable from "./SettingsTable/SettingsTable";

interface SettingsModalProps {
  modalVisible: boolean;
  closeModal: () => void;
  refetchData: () => Promise<void>;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  modalVisible,
  closeModal,
  refetchData,
}) => {
  const handleCloseModal = () => {
    refetchData();
    closeModal();
  };

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleCloseModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}>Settings</Text>
            <Ionicons
              name="return-up-back"
              size={scaleHeight(24)}
              color="black"
              onPress={handleCloseModal}
              style={styles.modalHeaderBackIcon}
            />
          </View>
          <SettingsTable />
        </View>
      </View>
    </Modal>
  );
};

export default SettingsModal;
