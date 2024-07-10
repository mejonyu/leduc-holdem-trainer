import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";

import styles from "./AuthModal.styles";

interface SignUpModalProps {
  email: string;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ email }) => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.heading}>Start Now</Text>
        <Text style={styles.subheading}>
          Train your poker intuition by learning GTO Leduc Hold'em.
        </Text>
        <Text style={styles.inputLabel}>Email Address</Text>
        <TextInput
          style={styles.uneditableInput}
          value={email}
          editable={false}
        />
        <Text style={[styles.inputLabel, { marginTop: 0 }]}>Password</Text>
        <TextInput style={styles.input} secureTextEntry />
        <Text style={styles.terms}>
          By creating an account, you agree to the Terms of Sale, Terms of
          Service, and Privacy Policy.
        </Text>
        <TouchableOpacity style={[styles.continueButton, { marginTop: 15 }]}>
          <Text style={styles.continueButtonText}>Create account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpModal;
