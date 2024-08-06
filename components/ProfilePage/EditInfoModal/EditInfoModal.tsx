import { View, Text, Modal, Easing } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import styles from "./EditInfoModal.styles";
import { scaleHeight } from "@/utils/dimensionScaling";
import { Animated } from "react-native";
import { Keyboard } from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { startShake } from "@/utils/animations";
import NameInput from "./NameInput/NameInput";
import CustomButton from "@/components/CustomButton/CustomButton";

interface EditInfoModalProps {
  title: string;
  modalVisible: boolean;
  closeModal: () => void;
  refetchData?: () => Promise<void>;
  customAnimationType?: "slide" | "fade" | "none";
}

const EditInfoModal: React.FC<EditInfoModalProps> = ({
  title,
  modalVisible,
  closeModal,
  refetchData,
  customAnimationType,
}) => {
  const [info, setInfo] = useState<string>("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasFocusedOnce, setHasFocusedOnce] = useState(false);
  const { updateName } = useAuth();

  const invalidInputAnimation = useRef(new Animated.Value(0)).current;
  const errorAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isValid && hasFocusedOnce) {
      Animated.timing(errorAnimation, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(errorAnimation, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [isValid, hasFocusedOnce]);

  const errorOpacity = errorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const errorTranslateY = errorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-2, 0],
  });

  const renderInputField = () => {
    switch (title) {
      case "Name":
        return (
          <NameInput
            name={info}
            setName={setInfo}
            isValid={isValid}
            setIsValid={setIsValid}
            hasFocusedOnce={hasFocusedOnce}
            setHasFocusedOnce={setHasFocusedOnce}
          />
        );

      // case "Email":

      default:
        break;
    }
  };

  const handleSaveName = async () => {
    Keyboard.dismiss();
    setLoading(true);
    if (isValid) {
      try {
        updateName(info);
        closeModal();
        if (refetchData) {
          refetchData();
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      startShake(invalidInputAnimation);
    }
    setLoading(false);
  };

  const getSaveFunction = () => {
    switch (title) {
      case "Name":
        return handleSaveName;

      default:
        return () => {};
    }
  };

  const getErrorText = () => {
    switch (title) {
      case "Name":
        if (info) {
          return "Must be 30 characters or less";
        } else {
          return "Name cannot be empty";
        }
      default:
        return null;
    }
  };

  const handleCloseModal = () => {
    setHasFocusedOnce(false);
    closeModal();
  };

  const renderInputLabel = () => {
    switch (title) {
      case "Name":
        return (
          <>
            <View style={styles.inputLabelIcon}>
              <FontAwesome name="id-badge" size={24} color="black" />
            </View>
            <Text style={styles.inputLabelText}>{title}</Text>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Modal
      visible={modalVisible}
      animationType={customAnimationType ? customAnimationType : "slide"}
      presentationStyle="pageSheet"
      onRequestClose={handleCloseModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}>Edit {title}</Text>
            <Ionicons
              name="return-up-back"
              size={scaleHeight(24)}
              color="black"
              onPress={handleCloseModal}
              style={styles.modalHeaderBackIcon}
            />
          </View>

          <View style={styles.modalForm}>
            <View style={styles.inputLabel}>{renderInputLabel()}</View>
            <Animated.View
              style={[
                styles.inputContainer,
                { transform: [{ translateX: invalidInputAnimation }] },
              ]}
            >
              {renderInputField()}
            </Animated.View>
            <Animated.View
              style={{
                opacity: errorOpacity,
                transform: [{ translateY: errorTranslateY }],
              }}
            >
              {!isValid && hasFocusedOnce && (
                <Text style={styles.errorText}>{getErrorText()}</Text>
              )}
            </Animated.View>
            <CustomButton
              text="Save"
              onPress={getSaveFunction()}
              loading={loading}
              customStyles={{ width: "100%" }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditInfoModal;
