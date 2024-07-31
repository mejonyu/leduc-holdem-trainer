import React, { useEffect, useState } from "react";
import { TextInput, View } from "react-native";
import styles from "./NameInput.styles";

interface NameInputProps {
  name: string;
  setName: (text: string) => void;
  isValid: boolean;
  setIsValid: (validity: boolean) => void;
  hasFocusedOnce: boolean;
  setHasFocusedOnce: (hasFocused: boolean) => void;
}

const NameInput: React.FC<NameInputProps> = ({
  name,
  setName,
  isValid,
  setIsValid,
  hasFocusedOnce,
  setHasFocusedOnce,
}) => {
  const validateName = (name: string): boolean => {
    length = name.length;
    return length <= 30 && length >= 1;
  };

  useEffect(() => {
    setIsValid(validateName(name));
  }, [name]);

  const handleBlur = () => {
    if (!hasFocusedOnce) {
      setHasFocusedOnce(true);
    }
    setIsValid(validateName(name));
  };

  return (
    <TextInput
      style={[
        styles.input,
        !isValid && hasFocusedOnce
          ? [styles.invalidInput, { marginBottom: 3 }]
          : null,
      ]}
      value={name}
      onChangeText={setName}
      onBlur={handleBlur}
      placeholder="John Doe"
      placeholderTextColor={!isValid && hasFocusedOnce ? "#fcd2cd" : "#C7C7CD"}
      autoCapitalize="none"
    />
  );
};

export default NameInput;
