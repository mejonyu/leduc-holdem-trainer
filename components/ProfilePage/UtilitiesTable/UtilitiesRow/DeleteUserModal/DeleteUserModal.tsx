import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { Modal } from "react-native";
import styles from "./DeleteUserModal.styles";
import { scaleIconSize } from "@/utils/dimensionScaling";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton/CustomButton";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";

interface DeleteUserModal {
  modalVisible: boolean;
  handleCloseModal: () => void;
}

const DeleteUserModal: React.FC<DeleteUserModal> = ({
  modalVisible,
  handleCloseModal,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { deleteUser } = useAuth();
  const handleDeleteAccount = () => {
    setLoading(true);
    try {
      deleteUser();
      router.back();
      router.back();
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
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
            <Text style={styles.modalHeaderText}>Delete Account</Text>
            <Ionicons
              name="return-up-back"
              size={scaleIconSize(28)}
              color="black"
              onPress={handleCloseModal}
              style={styles.modalHeaderBackIcon}
            />
          </View>
          <View style={styles.contentTop}>
            <View style={styles.imageContainer}>
              <Image
                source={require("@/assets/images/book-person.png")}
                resizeMode="contain"
                style={styles.image}
              />
            </View>
            <Text style={styles.topText}>
              We're really sorry to see you go.
            </Text>
          </View>

          <View style={styles.contentMiddle}>
            {/* <Text style={styles.middleHeaderText}>WHAT THIS MEANS</Text> */}
            <Text style={styles.middleText}>
              This action is{" "}
              <Text style={styles.middleEmphText}>irreversible</Text>. Deleting
              your account will remove all your personal data from our systems.
              Your hand data and all your account information will be{" "}
              <Text style={styles.middleEmphText}>permanently deleted</Text>.
            </Text>
          </View>

          <View style={styles.contentEnd}>
            <CustomButton
              text="Delete Account"
              onPress={handleDeleteAccount}
              loading={loading}
              customStyles={{ width: "100%" }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteUserModal;
