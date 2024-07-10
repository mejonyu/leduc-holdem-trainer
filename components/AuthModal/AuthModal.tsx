import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";
import { supabase } from "../../lib/supabase"; // Assume you have this set up

import styles from "./AuthModal.styles";

interface AuthModalProps {
  visible: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ visible, onClose }) => {
  const [email, setEmail] = useState<string>("");
  const [showLoginScreen, setShowLoginScreen] = useState<boolean>(false);
  const [showCreateAccountScreen, setShowCreateAccountScreen] =
    useState<boolean>(false);

  const handleContinueWithEmail = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("email")
      .eq("email", email)
      .single();

    if (data) {
      setShowLoginScreen(true);
    } else {
      setShowCreateAccountScreen(true);
    }
  };

  const renderInitialScreen = () => (
    <View style={styles.modalContainer}>
      {/* Header */}
      <View style={styles.row}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>x</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Bluff Buddy</Text>
      </View>

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

  const renderLoginScreen = () => (
    <View style={styles.modalContainer}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => setShowLoginScreen(false)}
      >
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.heading}>Log in</Text>
      <Text style={styles.subheading}>
        Track your stats, check streaks and compete against friends.
      </Text>
      <TextInput style={styles.input} value={email} editable={false} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />
      <Text style={styles.forgotPassword}>Forgot password</Text>
      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueButtonText}>Log in</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCreateAccountScreen = () => (
    <View style={styles.modalContainer}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => setShowCreateAccountScreen(false)}
      >
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.heading}>Create an account</Text>
      <Text style={styles.subheading}>
        Track your stats, check streaks and compete against friends.
      </Text>
      <TextInput style={styles.input} value={email} editable={false} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />
      <Text style={styles.terms}>
        By creating an account, you agree to the Terms of Sale, Terms of
        Service, and Privacy Policy.
      </Text>
      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueButtonText}>Create account</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Modal
      presentationStyle="pageSheet"
      visible={visible}
      animationType="slide"
    >
      {!showLoginScreen && !showCreateAccountScreen && renderInitialScreen()}
      {showLoginScreen && renderLoginScreen()}
      {showCreateAccountScreen && renderCreateAccountScreen()}
    </Modal>
  );
};

export default AuthModal;
