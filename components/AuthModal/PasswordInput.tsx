import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from "./AuthModal.styles";

interface PasswordInputProps {
  password: string;
  setPassword: (text: string) => void;
  hasSubmitted: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  password,
  setPassword,
  hasSubmitted,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={[styles.inputContainer]}>
      <TextInput
        style={[
          styles.input,
          hasSubmitted ? [styles.invalidInput, { marginBottom: 3 }] : null,
          { flex: 1, paddingRight: showPassword ? 50 : 57 }, // Add padding to make room for the button
        ]}
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Enter your password"
        placeholderTextColor={hasSubmitted ? "#fcd2cd" : ""}
        secureTextEntry={!showPassword}
      />
      <TouchableOpacity
        style={styles.showButton}
        onPress={() => setShowPassword(!showPassword)}
      >
        <Text style={styles.showButtonText}>
          {showPassword ? "Hide" : "Show"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PasswordInput;
