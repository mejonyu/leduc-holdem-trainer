import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import React, { useState } from "react";

import styles from "./AuthModal.styles";
import { router } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

interface LogInModalProps {
  email: string;
}

const LogInModal: React.FC<LogInModalProps> = ({ email }) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { logIn } = useAuth();

  const logInWithPassowrd = async (): Promise<void> => {
    setLoading(true);
    const session = await logIn(email, password);
    if (session) {
      router.replace("/(tabs)/one");
    }

    // if (error) Alert.alert(error.message);
    // if (!session)
    //   Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.heading}>Welcome Back</Text>
        <Text style={styles.subheading}>Sign in to your account.</Text>
        <Text style={styles.inputLabel}>Email Address</Text>
        <TextInput
          style={styles.uneditableInput}
          value={email}
          editable={false}
        />
        <Text style={[styles.inputLabel, { marginTop: 0 }]}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        {/* <Text style={styles.terms}>
          By creating an account, you agree to the Terms of Sale, Terms of
          Service, and Privacy Policy.
        </Text> */}
        <TouchableOpacity
          style={[styles.continueButton, { marginTop: 15 }]}
          disabled={loading}
          onPress={logInWithPassowrd}
        >
          <Text style={styles.continueButtonText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LogInModal;
