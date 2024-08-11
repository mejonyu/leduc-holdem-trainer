import { View, Text, Modal, Easing } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import styles from "./EditInfoModal.styles";
import { scaleHeight, scaleIconSize } from "@/utils/dimensionScaling";
import { Animated } from "react-native";
import { Keyboard } from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { startShake } from "@/utils/animations";
import NameInput from "./NameInput/NameInput";
import CustomButton from "@/components/CustomButton/CustomButton";
import EmailInput from "@/components/AuthModal/EmailInput";
import PasswordInput from "@/components/AuthModal/PasswordInput";

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

  const { updateName, updateEmail, updatePassword } = useAuth();

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
        case "Password":
          setErrorText("8+ characters required");
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

      case "Password":
        return (
          <PasswordInput
            password={info}
            setPassword={setInfo}
            hasSubmitted={hasFocusedOnce}
          />
        );

      default:
        break;
    }
  };

  const capitalizeName = () => {
    return info.replace(/\b\w/g, function (l) {
      return l.toUpperCase();
    });
  };

  const handleSaveName = async () => {
    Keyboard.dismiss();
    setLoading(true);
    if (isValid) {
      try {
        updateName(capitalizeName());
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
        setErrorText("A user with this email already exists");
        doUserExistsErrorAnimation();
        startShake(invalidInputAnimation);
      }
    } else {
      startShake(invalidInputAnimation);
    }
    setLoading(false);
  };

  const handleSavePassword = async () => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      await updatePassword(info);
      closeModal();
    } catch (error) {
      setHasFocusedOnce(true);
      startShake(invalidInputAnimation);
      console.error(error);
    }

    setLoading(false);
  };

  const getSaveFunction = () => {
    switch (title) {
      case "Name":
        return handleSaveName;
      case "Email":
        return handleSaveEmail;
      case "Password":
        return handleSavePassword;
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
            <Text style={styles.inputLabelText}>New {title}</Text>
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
            <Text style={styles.inputLabelText}>New {title}</Text>
          </>
        );

      case "Password":
        return (
          <>
            <View style={styles.inputLabelIcon}>
              <FontAwesome name="lock" size={scaleHeight(24)} color="black" />
            </View>
            <Text style={styles.inputLabelText}>New {title}</Text>
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
      onRequestClose={
        customAnimationType
          ? customAnimationType === "none"
            ? () => {}
            : handleCloseModal
          : handleCloseModal
      }
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}>
              {title === "Name" ? "Edit" : "Change"} {title}
            </Text>
            <Ionicons
              name="return-up-back"
              size={scaleIconSize(28)}
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
