import React, { useEffect } from "react";
import { TextInput } from "react-native";
import styles from "./AuthModal.styles";

interface EmailInputProps {
  email: string;
  setEmail: (text: string) => void;
  isValid: boolean;
  setIsValid: (validity: boolean) => void;
  hasFocusedOnce: boolean;
  setHasFocusedOnce: (hasFocused: boolean) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({
  email,
  setEmail,
  isValid,
  setIsValid,
  hasFocusedOnce,
  setHasFocusedOnce,
}) => {
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    setIsValid(validateEmail(email));
  }, [email]);

  const handleBlur = () => {
    if (!hasFocusedOnce) {
      setHasFocusedOnce(true);
    }
    setIsValid(validateEmail(email));
  };

  return (
    <>
      <TextInput
        style={[
          styles.input,
          !isValid && hasFocusedOnce
            ? [styles.invalidInput, { marginBottom: 3 }]
            : null,
        ]}
        value={email}
        onChangeText={setEmail}
        onBlur={handleBlur}
        placeholder="you@example.com"
        placeholderTextColor={!isValid && hasFocusedOnce ? "#fcd2cd" : ""}
        keyboardType="email-address"
        autoCapitalize="none"
      />
    </>
  );
};

export default EmailInput;
