import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { supabase } from "../../lib/supabase";

import styles from "./AuthModal.styles";
import { useRouter } from "expo-router";

interface ContinueWithEmailModalProps {
  signUpLink: string;
  logInLink: string;
}

const ContinueWithEmailModal: React.FC<ContinueWithEmailModalProps> = ({
  signUpLink,
  logInLink,
}) => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");

  const closeModal = () => {
    router.back();
  };

  const handleContinueWithEmail = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("email")
      .eq("email", email)
      .single();
    if (data) {
      router.push(logInLink);
    } else {
      router.push(signUpLink + `/${email}`);
    }
  };

  return (
    <View style={styles.modalContainer}>
      {/* Content */}
      <View style={styles.modalContent}>
        <Text style={styles.heading}>Log in or create an account</Text>
        <Text style={styles.terms}>
          By continuing, you agree to the Terms of Sale, Terms of Service, and
          Privacy Policy.
        </Text>
        <Text style={styles.inputLabel}>Email Address</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinueWithEmail}
        >
          <Text style={styles.continueButtonText}>Continue with email</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContinueWithEmailModal;
