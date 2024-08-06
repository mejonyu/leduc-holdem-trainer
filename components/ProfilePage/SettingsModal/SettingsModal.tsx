import { View, Text, Modal, Easing } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { scaleHeight } from "@/utils/dimensionScaling";
import { Animated } from "react-native";
import { Keyboard } from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { startShake } from "@/utils/animations";
import CustomButton from "@/components/CustomButton/CustomButton";
import styles from "./SettingsModal.styles";

interface SettingsModalProps {
  modalVisible: boolean;
  closeModal: () => void;
  refetchData?: () => Promise<void>;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  modalVisible,
  closeModal,
  refetchData,
}) => {
  const handleCloseModal = () => {
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
        </View>
      </View>
    </Modal>
  );
};

export default SettingsModal;
