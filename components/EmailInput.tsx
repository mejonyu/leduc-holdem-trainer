import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Animated,
  Easing,
} from "react-native";
import styles from "./AuthModal/AuthModal.styles";

interface EmailInputProps {
  email: string;
  setEmail: (text: string) => void;
  isValid: boolean;
  setIsValid: (validity: boolean) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({
  email,
  setEmail,
  isValid,
  setIsValid,
}) => {
  const [hasFocusedOnce, setHasFocusedOnce] = useState(false);
  const errorAnimation = useRef(new Animated.Value(0)).current;

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    setIsValid(validateEmail(email));
  }, [email]);

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

  const handleBlur = () => {
    if (!hasFocusedOnce) {
      setHasFocusedOnce(true);
    }
    setIsValid(validateEmail(email));
  };

  const errorOpacity = errorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const errorTranslateY = errorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-2, 0],
  });

  return (
    <>
      <TextInput
        style={[
          styles.input,
          !isValid && hasFocusedOnce ? { marginBottom: 3 } : null,
          !isValid && hasFocusedOnce ? styles.invalidInput : null,
        ]}
        value={email}
        onChangeText={setEmail}
        onBlur={handleBlur}
        placeholder="you@example.com"
        placeholderTextColor={!isValid && hasFocusedOnce ? "#fcd2cd" : ""}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Animated.View
        style={{
          opacity: errorOpacity,
          transform: [{ translateY: errorTranslateY }],
        }}
      >
        {!isValid && hasFocusedOnce && (
          <Text style={styles.errorText}>Must be a valid email</Text>
        )}
      </Animated.View>
    </>
  );
};

export default EmailInput;
