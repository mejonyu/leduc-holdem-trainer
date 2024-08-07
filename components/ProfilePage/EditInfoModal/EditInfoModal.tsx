import { View, Text, Modal, Easing } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import styles from "./EditInfoModal.styles";
import { scaleHeight } from "@/utils/dimensionScaling";
import { Animated } from "react-native";
import { Keyboard } from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { startShake } from "@/utils/animations";
import NameInput from "./NameInput/NameInput";
import CustomButton from "@/components/CustomButton/CustomButton";
import EmailInput from "@/components/AuthModal/EmailInput";

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
  const [errorText, setErrorText] = useState("");
  const [removeUserExistsOnNextEdit, setRemoveUserExistsMessageOnNextEdit] =
    useState(false);

  const { updateName, checkIfEmailExists, updateEmail } = useAuth();

  const invalidInputAnimation = useRef(new Animated.Value(0)).current;
  const errorAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const getErrorText = async () => {
      switch (title) {
        case "Name":
          if (info) {
            setErrorText("Must be 30 characters or less");
          } else {
            setErrorText("Name cannot be empty");
          }
          break;
        case "Email":
          setErrorText("Must be a valid email");
          break;
        default:
          return null;
      }
    };

    if (!isValid && hasFocusedOnce) {
      getErrorText();
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

  // Remove user with this email already exists message after edit.
  useEffect(() => {
    if (removeUserExistsOnNextEdit) {
      Animated.timing(errorAnimation, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }).start(() => {
        setRemoveUserExistsMessageOnNextEdit(false);
      });
    }
  }, [info]);

  const doUserExistsErrorAnimation = () => {
    setRemoveUserExistsMessageOnNextEdit(true);
    Animated.timing(errorAnimation, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

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

      case "Email":
        return (
          <EmailInput
            email={info}
            setEmail={setInfo}
            isValid={isValid}
            setIsValid={setIsValid}
            hasFocusedOnce={hasFocusedOnce}
            setHasFocusedOnce={setHasFocusedOnce}
          />
        );

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

  const handleSaveEmail = async () => {
    Keyboard.dismiss();
    setLoading(true);
    if (isValid) {
      try {
        await updateEmail(info);
        closeModal();
      } catch (error) {
        console.log(error);
        setErrorText("A user with this email already exists");
        doUserExistsErrorAnimation();
        startShake(invalidInputAnimation);
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
      case "Email":
        return handleSaveEmail;

      default:
        return () => {};
    }
  };

  const handleCloseModal = () => {
    closeModal();
    setTimeout(() => {
      setHasFocusedOnce(false);
      setInfo("");
    }, 300);
  };

  const renderInputLabel = () => {
    switch (title) {
      case "Name":
        return (
          <>
            <View style={styles.inputLabelIcon}>
              <FontAwesome
                name="id-badge"
                size={scaleHeight(24)}
                color="black"
              />
            </View>
            <Text style={styles.inputLabelText}>{title}</Text>
          </>
        );
      case "Email":
        return (
          <>
            <View style={styles.inputLabelIcon}>
              <MaterialIcons
                name="email"
                size={scaleHeight(24)}
                color="black"
              />
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
                <Text style={styles.errorText}>{errorText}</Text>
              )}
              {removeUserExistsOnNextEdit && (
                <Text style={styles.errorText}>{errorText}</Text>
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
